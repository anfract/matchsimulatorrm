// Playback for standalone result page.
var NARRATION_HAT = {
  goal: [
    "A brilliant move opens the defense!",
    "They carve through the middle with quick passes!",
    "What a flowing attack from the team in possession!"
  ],
  penaltyGoal: [
    "The referee points straight to the spot!",
    "A cool finish from twelve yards sends the keeper the wrong way!",
    "They make no mistake from the penalty spot!"
  ],
  postHit: [
    "The strike rattles the woodwork!",
    "It crashes against the frame of the goal!",
    "So close - the post denies them!"
  ],
  foul: [
    "That is a heavy challenge, and the referee stops play.",
    "Late contact there - the whistle goes immediately.",
    "A cynical foul breaks up the attack."
  ],
  injury: [
    "Play is stopped as the medical team are called on.",
    "The players signal to the bench for treatment.",
    "There is a pause here with a player down receiving attention."
  ],
  yellowCard: [
    "The referee goes to the pocket and shows yellow.",
    "A caution is shown after a late tackle.",
    "That foul earns a yellow card."
  ],
  redCard: [
    "The referee produces a red card immediately.",
    "That challenge is judged serious foul play.",
    "Straight red, and the team are down to ten."
  ],
  chance: [
    "A huge opening appears in the final third.",
    "They work a dangerous chance in the box.",
    "A quick transition creates space to shoot."
  ],
  fullTime: [
    "Full-time. A hard-fought contest from start to finish.",
    "The final whistle goes after a dramatic game.",
    "That wraps it up - plenty of action in this one."
  ]
};

var liveMatchTimer = null;
var narrationTimers = [];
var matchClockPaused = false;

function clearNarrationTimers() {
  while (narrationTimers.length) {
    clearTimeout(narrationTimers.pop());
  }
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickWeightedSquadNumber(role, excludedNumber) {
  var weightsByRole = {
    goalScorer: [0.01, 0.14, 0.14, 0.16, 0.18, 0.38, 0.55, 0.72, 1.75, 1.9, 1.65],
    attackSupport: [0.02, 0.22, 0.24, 0.28, 0.36, 0.65, 0.92, 1.02, 1.1, 1.18, 1.05],
    yellowCard: [0.008, 1, 1.08, 1.12, 1.08, 0.98, 0.92, 0.86, 0.68, 0.58, 0.6],
    redCard: [0.025, 0.98, 1.04, 1.08, 1.04, 0.94, 0.9, 0.84, 0.7, 0.62, 0.64],
    discipline: [0.05, 0.95, 1.02, 1.05, 1, 0.92, 0.88, 0.84, 0.72, 0.64, 0.66],
    injury: [0.06, 0.85, 0.92, 0.95, 0.92, 0.95, 0.96, 0.92, 0.8, 0.72, 0.74],
    generalOutfield: [0.04, 0.75, 0.85, 0.95, 0.95, 1, 1, 1, 0.82, 0.78, 0.8]
  };
  var weights = weightsByRole[role] || weightsByRole.generalOutfield;
  var totalWeight = 0;
  var idx;

  for (idx = 0; idx < weights.length; idx += 1) {
    if (idx + 1 !== excludedNumber) {
      totalWeight += weights[idx];
    }
  }

  if (totalWeight <= 0) {
    return excludedNumber === 11 ? 10 : 11;
  }

  var roll = Math.random() * totalWeight;
  var runningWeight = 0;
  for (idx = 0; idx < weights.length; idx += 1) {
    if (idx + 1 === excludedNumber) {
      continue;
    }
    runningWeight += weights[idx];
    if (roll <= runningWeight) {
      return idx + 1;
    }
  }

  return excludedNumber === 11 ? 10 : 11;
}

function formatPlayerReference(number) {
  if (number === 1) {
    return "Goalkeeper No. 1";
  }
  return "No. " + number;
}

function pickFromHat(category) {
  var options = NARRATION_HAT[category] || [];
  if (!options.length) {
    return "";
  }
  return options[randomInt(0, options.length - 1)];
}

function isShotType(type) {
  return type === "goal" || type === "postHit" || type === "chance";
}

function countsAsShotOnTarget(eventData) {
  if (!eventData || !isShotType(eventData.type)) {
    return false;
  }
  if (typeof eventData.onTarget === "boolean") {
    return eventData.onTarget;
  }
  return eventData.type === "goal" || eventData.type === "chance";
}

function shouldDisplayMatchEvent(eventData) {
  return !!eventData && (
    eventData.type === "goal" ||
    eventData.type === "injury" ||
    eventData.type === "yellowCard" ||
    eventData.type === "redCard"
  );
}

function buildNarrationSequence(eventData, match) {
  var isHome = eventData.team === "home";
  var attackingTeam = isHome ? match.homeTeam : match.awayTeam;
  var fallbackRole = eventData.type === "goal" || eventData.type === "chance" || eventData.type === "postHit"
    ? "goalScorer"
    : eventData.type === "injury"
      ? "injury"
      : eventData.type === "yellowCard"
        ? "yellowCard"
        : eventData.type === "redCard"
          ? "redCard"
          : eventData.type === "foul"
            ? "discipline"
        : "generalOutfield";
  var actorNumber = typeof eventData.playerNumber === "number"
    ? eventData.playerNumber
    : pickWeightedSquadNumber(fallbackRole);
  var supportNumber = typeof eventData.secondaryPlayerNumber === "number"
    ? eventData.secondaryPlayerNumber
    : pickWeightedSquadNumber("attackSupport", actorNumber);
  var p1 = formatPlayerReference(supportNumber);
  var p2 = formatPlayerReference(actorNumber);

  if (eventData.type === "goal") {
    if (eventData.isPenalty) {
      return [
        eventData.minute + "': " + p2 + " is brought down in the area for " + attackingTeam + "...",
        pickFromHat("penaltyGoal"),
        "GOAL! " + attackingTeam + " score from the spot through " + p2 + "!"
      ];
    }

    return [
      eventData.minute + "': " + p1 + " from " + attackingTeam + " slips a pass through to " + p2 + "...",
      pickFromHat("goal"),
      "GOAL! " + attackingTeam + " score through " + p2 + "!"
    ];
  }

  if (eventData.type === "postHit") {
    return [
      eventData.minute + "': " + p1 + " drives forward for " + attackingTeam + "...",
      p2 + " takes the shot!",
      pickFromHat("postHit")
    ];
  }

  if (eventData.type === "foul") {
    return [
      eventData.minute + "': " + p1 + " tries to turn away in midfield.",
      "Contact comes in from behind as the move develops.",
      pickFromHat("foul")
    ];
  }

  if (eventData.type === "injury") {
    return [
      eventData.minute + "': " + p2 + " stays down after a heavy collision for " + attackingTeam + ".",
      "The referee waves the physios on immediately.",
      pickFromHat("injury")
    ];
  }

  if (eventData.type === "yellowCard") {
    return [
      eventData.minute + "': " + p2 + " arrives late in the challenge for " + attackingTeam + ".",
      "The referee stops play and calls the player over.",
      pickFromHat("yellowCard")
    ];
  }

  if (eventData.type === "redCard") {
    return [
      eventData.minute + "': " + p2 + " lunges in recklessly for " + attackingTeam + ".",
      "Players crowd around the referee after the whistle.",
      pickFromHat("redCard")
    ];
  }

  return [
    eventData.minute + "': " + pickFromHat("chance"),
    p2 + " takes the shot!",
    "The keeper gets down quickly and saves."
  ];
}

function playNarration(eventData, match) {
  var narrationText = document.getElementById("narrationText");
  if (!narrationText) {
    return;
  }

  clearNarrationTimers();
  matchClockPaused = true;
  var lines = buildNarrationSequence(eventData, match);
  narrationText.textContent = lines[0];
  narrationTimers.push(setTimeout(function () {
    narrationText.textContent = lines[1];
  }, 1800));
  narrationTimers.push(setTimeout(function () {
    narrationText.textContent = lines[2];
  }, 3600));
  narrationTimers.push(setTimeout(function () {
    matchClockPaused = false;
  }, 5000));
}

function renderResult(match) {
  var resultSection = document.getElementById("result");
  var fixture = document.getElementById("fixture");
  var scoreline = document.getElementById("scoreline");
  var eventsList = document.getElementById("events");
  var narrationText = document.getElementById("narrationText");

  if (liveMatchTimer) {
    clearInterval(liveMatchTimer);
    liveMatchTimer = null;
  }
  clearNarrationTimers();
  matchClockPaused = false;

  fixture.textContent = match.homeTeam + " vs " + match.awayTeam;
  scoreline.textContent = "0'  |  0 - 0";
  eventsList.innerHTML = "";
  if (narrationText) {
    narrationText.textContent = "Kickoff underway. Waiting for first big action...";
  }
  resultSection.classList.remove("hidden");

  // Render available statistics (if present) and prepare live updating of stats
  var statsSection = document.getElementById("match-stats");
  var setText = function (id, val) {
    var el = document.getElementById(id);
    if (el) el.textContent = val;
  };

  var minute = 0;
  var homeGoals = 0;
  var awayGoals = 0;
  var nextEventIndex = 0;
  var displayedEventCount = 0;
  var possessionMomentum = 0;
  var speedMs = 220;

  if (match.stats) {
    if (statsSection) {
      statsSection.classList.remove("hidden");
    }

    // Final stats to reach by full-time
    var final = {
      possessionHome: Number(match.stats.possession.home),
      possessionAway: Number(match.stats.possession.away),
      shotsHome: Number(match.stats.shots.home),
      shotsAway: Number(match.stats.shots.away),
      sOTHome: Number(match.stats.shotsOnTarget.home),
      sOTAway: Number(match.stats.shotsOnTarget.away),
      foulsHome: Number(match.stats.fouls.home),
      foulsAway: Number(match.stats.fouls.away),
      cornersHome: Number(match.stats.corners.home),
      cornersAway: Number(match.stats.corners.away),
      xGHome: Number(match.stats.xG.home),
      xGAway: Number(match.stats.xG.away)
    };

    setText("stat-teams", match.homeTeam + " - " + match.awayTeam);

    // Current live stats (will animate towards final)
    var cur = {
      possessionHome: 50,
      shotsHome: 0,
      shotsAway: 0,
      sOTHome: 0,
      sOTAway: 0,
      foulsHome: 0,
      foulsAway: 0,
      cornersHome: 0,
      cornersAway: 0,
      xGHome: 0,
      xGAway: 0
    };

    // Analyze event-driven contributions
    var eventShots = { home: 0, away: 0 };
    var eventShotsOnTarget = { home: 0, away: 0 };
    var eventXG = { home: 0, away: 0 };
    var eventFouls = { home: 0, away: 0 };
    var eventMinutesSet = new Set();
    match.events.forEach(function (ev) {
      eventMinutesSet.add(ev.minute);
      if (isShotType(ev.type)) {
        if (ev.team === "home") {
          eventShots.home += 1;
          if (countsAsShotOnTarget(ev)) eventShotsOnTarget.home += 1;
          eventXG.home += Number(ev.xg || 0);
        } else {
          eventShots.away += 1;
          if (countsAsShotOnTarget(ev)) eventShotsOnTarget.away += 1;
          eventXG.away += Number(ev.xg || 0);
        }
      } else if (ev.type === "foul") {
        if (ev.team === "home") eventFouls.home += 1; else eventFouls.away += 1;
      }
    });

    // Determine extra (non-event) actions to schedule across the 90 minutes
    var extraShotsHome = Math.max(0, final.shotsHome - eventShots.home);
    var extraShotsAway = Math.max(0, final.shotsAway - eventShots.away);
    var extraSOTHome = Math.max(0, final.sOTHome - eventShotsOnTarget.home);
    var extraSOTAway = Math.max(0, final.sOTAway - eventShotsOnTarget.away);
    var extraFoulsHome = Math.max(0, final.foulsHome - eventFouls.home);
    var extraFoulsAway = Math.max(0, final.foulsAway - eventFouls.away);
    var extraCornersHome = Math.max(0, final.cornersHome);
    var extraCornersAway = Math.max(0, final.cornersAway);

    var xgExtraHome = Math.max(0, final.xGHome - eventXG.home);
    var xgExtraAway = Math.max(0, final.xGAway - eventXG.away);

    function pickMinutes(count, excludeSet) {
      var res = new Set();
      var attempts = 0;
      while (res.size < count && attempts < 2000) {
        attempts++;
        var m = Math.floor(Math.random() * 89) + 1;
        if (!excludeSet.has(m)) res.add(m);
      }
      return Array.from(res);
    }

    var extraShotMinutesHome = pickMinutes(extraShotsHome, eventMinutesSet);
    var extraShotMinutesAway = pickMinutes(extraShotsAway, eventMinutesSet);
    var extraFoulMinutesHome = pickMinutes(extraFoulsHome, eventMinutesSet);
    var extraFoulMinutesAway = pickMinutes(extraFoulsAway, eventMinutesSet);
    var extraCornerMinutesHome = pickMinutes(extraCornersHome, eventMinutesSet);
    var extraCornerMinutesAway = pickMinutes(extraCornersAway, eventMinutesSet);

    function pickKFromArray(arr, k) {
      var res = new Set();
      var copy = arr.slice();
      while (res.size < k && copy.length) {
        var idx = Math.floor(Math.random() * copy.length);
        res.add(copy.splice(idx, 1)[0]);
      }
      return res;
    }

    var extraSOTMinutesHome = pickKFromArray(extraShotMinutesHome, extraSOTHome);
    var extraSOTMinutesAway = pickKFromArray(extraShotMinutesAway, extraSOTAway);

    var xgPerExtraHome = extraShotsHome > 0 ? xgExtraHome / extraShotsHome : 0;
    var xgPerExtraAway = extraShotsAway > 0 ? xgExtraAway / extraShotsAway : 0;

    var extraShotSetHome = new Set(extraShotMinutesHome);
    var extraShotSetAway = new Set(extraShotMinutesAway);
    var extraFoulSetHome = new Set(extraFoulMinutesHome);
    var extraFoulSetAway = new Set(extraFoulMinutesAway);
    var extraCornerSetHome = new Set(extraCornerMinutesHome);
    var extraCornerSetAway = new Set(extraCornerMinutesAway);

    function clampInt(v) { return Math.max(0, Math.round(v)); }

    function displayStats() {
      setText("stat-possession", clampInt(cur.possessionHome) + "% - " + (100 - clampInt(cur.possessionHome)) + "%");
      setText("stat-shots", clampInt(cur.shotsHome) + " - " + clampInt(cur.shotsAway));
      setText("stat-sot", clampInt(cur.sOTHome) + " - " + clampInt(cur.sOTAway));
      setText("stat-fouls", clampInt(cur.foulsHome) + " - " + clampInt(cur.foulsAway));
      setText("stat-corners", clampInt(cur.cornersHome) + " - " + clampInt(cur.cornersAway));
      setText("stat-xg", (cur.xGHome).toFixed(2) + " - " + (cur.xGAway).toFixed(2));
    }

    // Initial display
    displayStats();
  } else {
    if (statsSection) statsSection.classList.add("hidden");
  }

  liveMatchTimer = setInterval(function () {
    if (matchClockPaused) return;

    minute += 1;

    // scheduled extras (non-event) for this minute
    if (match.stats) {
      var progress = minute / 90;
      var driftTarget = 50 + (final.possessionHome - 50) * Math.pow(progress, 0.8);
      var swingSize = Math.max(1.2, 5 - progress * 3.2);
      possessionMomentum += Math.random() * 3.2 - 1.6;
      possessionMomentum = Math.max(-6, Math.min(6, possessionMomentum));
      cur.possessionHome = Math.round(driftTarget + possessionMomentum + (Math.random() * 2 - 1) * swingSize);
      cur.possessionHome = Math.max(28, Math.min(72, cur.possessionHome));

      if (extraShotSetHome.has(minute)) {
        cur.shotsHome += 1;
        if (extraSOTMinutesHome.has(minute)) cur.sOTHome += 1;
        cur.xGHome += xgPerExtraHome;
      }
      if (extraShotSetAway.has(minute)) {
        cur.shotsAway += 1;
        if (extraSOTMinutesAway.has(minute)) cur.sOTAway += 1;
        cur.xGAway += xgPerExtraAway;
      }

      if (extraFoulSetHome.has(minute)) cur.foulsHome += 1;
      if (extraFoulSetAway.has(minute)) cur.foulsAway += 1;
      if (extraCornerSetHome.has(minute)) cur.cornersHome += 1;
      if (extraCornerSetAway.has(minute)) cur.cornersAway += 1;
    }

    // process official events at this minute
    while (nextEventIndex < match.events.length && match.events[nextEventIndex].minute <= minute) {
      var eventData = match.events[nextEventIndex];
      if (eventData.type === "goal" && eventData.team === "home") {
        homeGoals += 1;
      } else if (eventData.type === "goal" && eventData.team === "away") {
        awayGoals += 1;
      }

      if (isShotType(eventData.type)) {
        if (eventData.team === "home") {
          cur.shotsHome += 1;
          if (countsAsShotOnTarget(eventData)) cur.sOTHome += 1;
          cur.xGHome += Number(eventData.xg || 0);
        } else {
          cur.shotsAway += 1;
          if (countsAsShotOnTarget(eventData)) cur.sOTAway += 1;
          cur.xGAway += Number(eventData.xg || 0);
        }
      } else if (eventData.type === "foul") {
        if (eventData.team === "home") cur.foulsHome += 1; else cur.foulsAway += 1;
      }

      if (shouldDisplayMatchEvent(eventData)) {
        var item = document.createElement("li");
        item.textContent = eventData.text;
        eventsList.appendChild(item);
        playNarration(eventData, match);
        displayedEventCount += 1;
      }
      nextEventIndex += 1;
    }

    scoreline.textContent = minute + "'  |  " + homeGoals + " - " + awayGoals;
    if (match.stats) displayStats();

    if (minute >= 90) {
      clearInterval(liveMatchTimer);
      liveMatchTimer = null;
      matchClockPaused = false;

      if (match.stats) {
        cur.shotsHome = final.shotsHome;
        cur.shotsAway = final.shotsAway;
        cur.sOTHome = final.sOTHome;
        cur.sOTAway = final.sOTAway;
        cur.foulsHome = final.foulsHome;
        cur.foulsAway = final.foulsAway;
        cur.cornersHome = final.cornersHome;
        cur.cornersAway = final.cornersAway;
        cur.xGHome = final.xGHome;
        cur.xGAway = final.xGAway;
        cur.possessionHome = final.possessionHome;
        displayStats();
      }

      if (!displayedEventCount) {
        var noGoalItem = document.createElement("li");
        noGoalItem.textContent = "No goals or cards.";
        eventsList.appendChild(noGoalItem);
        if (narrationText) {
          narrationText.textContent = "The match ends without any goals or disciplinary flashpoints.";
        }
      } else if (narrationText) {
        narrationText.textContent = pickFromHat("fullTime");
      }

      scoreline.textContent = "FT  |  " + homeGoals + " - " + awayGoals;
    }
  }, speedMs);
}

document.addEventListener("DOMContentLoaded", function () {
  var raw = sessionStorage.getItem("lastMatchResult");
  if (!raw) {
    var resultSection = document.getElementById("result");
    resultSection.innerHTML = "<p>No match data found. Use the Return to menu button.</p>";
    return;
  }

  try {
    var match = JSON.parse(raw);
    renderResult(match);
  } catch (e) {
    var resultSection = document.getElementById("result");
    resultSection.innerHTML = "<p>Unable to read match data. Use the Return to menu button.</p>";
    console.error("Failed to parse match result", e);
  }

  var backBtn = document.getElementById("backButton");
  if (backBtn) {
    backBtn.addEventListener("click", function () {
      try {
        sessionStorage.removeItem("lastMatchResult");
      } catch (e) {}
      window.location.href = "index.html";
    });
  }
});
