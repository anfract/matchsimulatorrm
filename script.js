function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function supportMultiplier(level) {
  var map = {
    veryLow: 0.9,
    low: 0.97,
    medium: 1,
    high: 1.08
  };
  return map[level] || 1;
}

function motivationMultiplier(level) {
  var map = {
    low: 0.93,
    medium: 1,
    high: 1.08
  };
  return map[level] || 1;
}

function fatigueMultiplier(level) {
  var map = {
    none: 1,
    low: 0.96,
    medium: 0.9,
    high: 0.82
  };
  return map[level] || 1;
}

function aggressionLevelImpact(level) {
  var map = {
    veryLow: -1.8,
    low: -0.7,
    medium: 0.8,
    high: 2.4
  };
  return map[level] || 0;
}

function strengthProfile(rating) {
  var bounded = clamp(Number(rating) || 1, 1, 100);

  if (bounded >= 90) {
    return { label: "World class team", ratingMultiplier: 1.18, composureBonus: 0.02, tempoBonus: 0.08 };
  }
  if (bounded >= 85) {
    return { label: "Great team", ratingMultiplier: 1.11, composureBonus: 0.014, tempoBonus: 0.05 };
  }
  if (bounded >= 80) {
    return { label: "Good team", ratingMultiplier: 1.06, composureBonus: 0.009, tempoBonus: 0.03 };
  }
  if (bounded >= 75) {
    return { label: "Solid team", ratingMultiplier: 1.03, composureBonus: 0.004, tempoBonus: 0.015 };
  }
  if (bounded >= 70) {
    return { label: "Decent", ratingMultiplier: 1, composureBonus: 0, tempoBonus: 0 };
  }
  if (bounded >= 65) {
    return { label: "Alright", ratingMultiplier: 0.97, composureBonus: -0.004, tempoBonus: -0.01 };
  }
  if (bounded >= 60) {
    return { label: "Bad", ratingMultiplier: 0.93, composureBonus: -0.01, tempoBonus: -0.025 };
  }
  if (bounded >= 55) {
    return { label: "Weak semi-pro side", ratingMultiplier: 0.88, composureBonus: -0.018, tempoBonus: -0.045 };
  }
  if (bounded >= 50) {
    return { label: "Average semi-pro side", ratingMultiplier: 0.83, composureBonus: -0.025, tempoBonus: -0.065 };
  }
  if (bounded >= 45) {
    return { label: "Limited semi-pro side", ratingMultiplier: 0.77, composureBonus: -0.033, tempoBonus: -0.085 };
  }
  if (bounded >= 40) {
    return { label: "Struggling semi-pro side", ratingMultiplier: 0.71, composureBonus: -0.04, tempoBonus: -0.105 };
  }
  if (bounded >= 35) {
    return { label: "Regional semi-pro side", ratingMultiplier: 0.64, composureBonus: -0.048, tempoBonus: -0.13 };
  }
  if (bounded >= 30) {
    return { label: "Lower regional side", ratingMultiplier: 0.57, composureBonus: -0.056, tempoBonus: -0.155 };
  }
  if (bounded >= 25) {
    return { label: "Amateur-level side", ratingMultiplier: 0.5, composureBonus: -0.064, tempoBonus: -0.18 };
  }
  if (bounded >= 20) {
    return { label: "Developing amateur side", ratingMultiplier: 0.44, composureBonus: -0.072, tempoBonus: -0.2 };
  }
  if (bounded >= 15) {
    return { label: "Grassroots side", ratingMultiplier: 0.39, composureBonus: -0.08, tempoBonus: -0.22 };
  }
  if (bounded >= 10) {
    return { label: "Beginner side", ratingMultiplier: 0.35, composureBonus: -0.088, tempoBonus: -0.24 };
  }
  return { label: "Entry-level side", ratingMultiplier: 0.31, composureBonus: -0.095, tempoBonus: -0.26 };
}

function tacticProfile(style) {
  var profiles = {
    veryOffensive: {
      possessionBias: 3.4,
      attackBias: 0.08,
      shotBias: 0.12,
      shotQualityBias: -0.002,
      tempoBias: 1.8,
      eventChanceBias: 0.08,
      cornerBias: 1.2
    },
    offensive: {
      possessionBias: 1.8,
      attackBias: 0.04,
      shotBias: 0.06,
      shotQualityBias: 0.004,
      tempoBias: 0.9,
      eventChanceBias: 0.04,
      cornerBias: 0.6
    },
    neutral: {
      possessionBias: 0,
      attackBias: 0,
      shotBias: 0,
      shotQualityBias: 0,
      tempoBias: 0,
      eventChanceBias: 0,
      cornerBias: 0
    },
    counterAttacking: {
      possessionBias: -3.2,
      attackBias: 0.02,
      shotBias: -0.02,
      shotQualityBias: 0.018,
      tempoBias: 0.4,
      eventChanceBias: 0.03,
      cornerBias: -0.1
    },
    defensive: {
      possessionBias: -4.4,
      attackBias: -0.05,
      shotBias: -0.09,
      shotQualityBias: -0.008,
      tempoBias: -1.4,
      eventChanceBias: -0.06,
      cornerBias: -0.8
    }
  };
  return profiles[style] || profiles.neutral;
}

function intensityProfile(level) {
  var profiles = {
    low: {
      motivationBoost: 0.96,
      tempoBonus: -0.06,
      eventBias: -0.02,
      aggressionBonus: -0.4,
      shotQualityBonus: -0.003,
      cardRiskMultiplier: 0.9
    },
    medium: {
      motivationBoost: 1,
      tempoBonus: 0,
      eventBias: 0,
      aggressionBonus: 0,
      shotQualityBonus: 0,
      cardRiskMultiplier: 1
    },
    high: {
      motivationBoost: 1.05,
      tempoBonus: 0.08,
      eventBias: 0.025,
      aggressionBonus: 0.5,
      shotQualityBonus: 0.003,
      cardRiskMultiplier: 1.1
    },
    veryHigh: {
      motivationBoost: 1.08,
      tempoBonus: 0.12,
      eventBias: 0.035,
      aggressionBonus: 0.8,
      shotQualityBonus: 0.006,
      cardRiskMultiplier: 1.18
    }
  };
  return profiles[level] || profiles.medium;
}

function weightedChance(homeStrength, awayStrength) {
  var total = Math.max(homeStrength + awayStrength, 1);
  return {
    homeShare: homeStrength / total,
    awayShare: awayStrength / total
  };
}

var liveMatchTimer = null;
var narrationTimers = [];
var matchClockPaused = false;
var NARRATION_HAT = {
  goal: [
    "A brilliant move opens the defense!",
    "They carve through the middle with quick passes!",
    "What a flowing attack from the team in possession!"
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
  yellowCard: [
    "The referee reaches straight for the yellow card.",
    "That challenge goes into the book immediately.",
    "A late tackle earns a caution."
  ],
  redCard: [
    "The referee has no hesitation - it's a red card.",
    "That is a sending off after a reckless challenge.",
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

function simulateMatch(
  homeTeam,
  awayTeam,
  homeStrength,
  awayStrength,
  homeSupport,
  awaySupport,
  homeMotivation,
  awayMotivation,
  homeFatigue,
  awayFatigue,
  homeAggressionSetting,
  awayAggressionSetting,
  homeApproachSetting,
  awayApproachSetting,
  homeIntensitySetting,
  awayIntensitySetting
) {
  var homeStrengthTier = strengthProfile(homeStrength);
  var awayStrengthTier = strengthProfile(awayStrength);
  var homeApproach = tacticProfile(homeApproachSetting);
  var awayApproach = tacticProfile(awayApproachSetting);
  var homeIntensity = intensityProfile(homeIntensitySetting);
  var awayIntensity = intensityProfile(awayIntensitySetting);
  var boostedHomeStrength = homeStrength
    * homeStrengthTier.ratingMultiplier
    * supportMultiplier(homeSupport)
    * motivationMultiplier(homeMotivation)
    * homeIntensity.motivationBoost
    * fatigueMultiplier(homeFatigue);
  var boostedAwayStrength = awayStrength
    * awayStrengthTier.ratingMultiplier
    * supportMultiplier(awaySupport)
    * motivationMultiplier(awayMotivation)
    * awayIntensity.motivationBoost
    * fatigueMultiplier(awayFatigue);
  var shares = weightedChance(
    boostedHomeStrength * (1 + homeApproach.attackBias),
    boostedAwayStrength * (1 + awayApproach.attackBias)
  );
  var totalGoalEvents = clamp(
    Math.round(
      2
      + Math.random() * 3
      + homeApproach.tempoBias
      + awayApproach.tempoBias
      + homeIntensity.tempoBonus
      + awayIntensity.tempoBonus
    ),
    1,
    7
  );
  var minutes = [];

  while (minutes.length < totalGoalEvents) {
    var minute = Math.floor(Math.random() * 86) + 5; // 5..90
    if (!minutes.includes(minute)) {
      minutes.push(minute);
    }
  }

  minutes.sort(function (a, b) { return a - b; });

  var homeGoals = 0;
  var awayGoals = 0;
  var events = [];
  var usedEventMinutes = {};

  var eventsXGHome = 0;
  var eventsXGAway = 0;
  var shotEventsHome = 0;
  var shotEventsAway = 0;
  var shotEventsOnTargetHome = 0;
  var shotEventsOnTargetAway = 0;
  var foulEventsHome = 0;
  var foulEventsAway = 0;

  function randRange(min, max) { return min + Math.random() * (max - min); }
  function levelImpact(level, map) { return map[level] || 0; }
  function markMinuteUsed(minute) { usedEventMinutes[minute] = true; }
  function pickUnusedMinute() {
    var attempts = 0;
    while (attempts < 500) {
      attempts += 1;
      var minute = Math.floor(Math.random() * 89) + 1;
      if (!usedEventMinutes[minute]) {
        markMinuteUsed(minute);
        return minute;
      }
    }
    return null;
  }

  minutes.forEach(markMinuteUsed);

  for (var i = 0; i < minutes.length; i += 1) {
    var eventRoll = Math.random();
    var teamRoll = Math.random();
    var team = teamRoll < shares.homeShare ? "home" : "away";
    var teamName = team === "home" ? homeTeam : awayTeam;
    var teamApproach = team === "home" ? homeApproach : awayApproach;
    var teamIntensity = team === "home" ? homeIntensity : awayIntensity;
    var adjustedEventRoll = eventRoll - teamApproach.eventChanceBias - teamIntensity.eventBias;
    var ev = { minute: minutes[i], team: team };

    if (adjustedEventRoll < 0.2) {
      ev.type = "foul";
      ev.text = minutes[i] + "' Foul by " + teamName;
      ev.xg = 0;
      if (team === "home") { foulEventsHome += 1; } else { foulEventsAway += 1; }
    } else if (adjustedEventRoll < 0.4) {
      ev.type = "postHit";
      ev.text = minutes[i] + "' " + teamName + " hit the post!";
      ev.xg = parseFloat(randRange(0.08, 0.22).toFixed(2));
      ev.onTarget = false;
      if (team === "home") { shotEventsHome += 1; eventsXGHome += ev.xg; } else { shotEventsAway += 1; eventsXGAway += ev.xg; }
    } else if (adjustedEventRoll < 0.66) {
      ev.type = "chance";
      ev.text = minutes[i] + "' Big chance for " + teamName + " (saved)";
      ev.xg = parseFloat(randRange(0.12, 0.34).toFixed(2));
      ev.onTarget = true;
      if (team === "home") {
        shotEventsHome += 1;
        shotEventsOnTargetHome += 1;
        eventsXGHome += ev.xg;
      } else {
        shotEventsAway += 1;
        shotEventsOnTargetAway += 1;
        eventsXGAway += ev.xg;
      }
    } else {
      ev.type = "goal";
      ev.text = minutes[i] + "' Goal! " + teamName;
      ev.xg = parseFloat(randRange(0.16, 0.48).toFixed(2));
      ev.onTarget = true;
      if (team === "home") {
        homeGoals += 1;
        shotEventsHome += 1;
        shotEventsOnTargetHome += 1;
        eventsXGHome += ev.xg;
      } else {
        awayGoals += 1;
        shotEventsAway += 1;
        shotEventsOnTargetAway += 1;
        eventsXGAway += ev.xg;
      }
    }

    events.push(ev);
  }

  // Derived stats tuned to feel closer to a typical real-world match report.
  var homeControlEdge = shares.homeShare - 0.5;
  var matchTempo = clamp(
    (boostedHomeStrength + boostedAwayStrength) / 140
      + (homeApproach.tempoBias + awayApproach.tempoBias) / 18
      + homeIntensity.tempoBonus
      + awayIntensity.tempoBonus
      + homeStrengthTier.tempoBonus
      + awayStrengthTier.tempoBonus,
    0.82,
    1.28
  );
  var homePossessionBias = levelImpact(homeSupport, { veryLow: -1.6, low: -0.8, medium: 0, high: 1.7 })
    + levelImpact(homeMotivation, { low: -1.1, medium: 0, high: 1.2 })
    + levelImpact(homeFatigue, { none: 0, low: -0.6, medium: -1.4, high: -2.6 })
    + homeApproach.possessionBias;
  var awayPossessionBias = levelImpact(awaySupport, { veryLow: -1.6, low: -0.8, medium: 0, high: 1.7 })
    + levelImpact(awayMotivation, { low: -1.1, medium: 0, high: 1.2 })
    + levelImpact(awayFatigue, { none: 0, low: -0.6, medium: -1.4, high: -2.6 })
    + awayApproach.possessionBias;
  var balancedMatchFactor = 1 - clamp(Math.abs(homeControlEdge) / 0.18, 0, 1);
  var tacticalSwing = randRange(-7, 7) * balancedMatchFactor;
  var rawPossessionHome = Math.round(
    50
    + homeControlEdge * 34
    + (homePossessionBias - awayPossessionBias) * 1.8
    + tacticalSwing
    + randRange(-3, 3)
  );
  var possessionHome = clamp(rawPossessionHome, 34, 66);
  var possessionAway = 100 - possessionHome;

  var extraShotsPool = Math.round(
    randRange(12, 24) * matchTempo
    + Math.abs(homeControlEdge) * 4
    + (homeApproach.shotBias + awayApproach.shotBias) * 14
  );
  var extraShotShareHome = clamp(
    shares.homeShare + (homeApproach.shotBias - awayApproach.shotBias) * 0.45 + randRange(-0.04, 0.04),
    0.24,
    0.76
  );
  var extraShotsHome = Math.max(0, Math.round(extraShotsPool * extraShotShareHome));
  var extraShotsAway = Math.max(0, extraShotsPool - extraShotsHome);

  var shotsHome = shotEventsHome + extraShotsHome;
  var shotsAway = shotEventsAway + extraShotsAway;

  var shootingAccuracyHome = clamp(
    0.27
      + (possessionHome - 50) * 0.003
      + homeApproach.shotQualityBias * 0.65
      + homeIntensity.shotQualityBonus
      + homeStrengthTier.composureBonus
      + randRange(-0.04, 0.05),
    0.24,
    0.42
  );
  var shootingAccuracyAway = clamp(
    0.27
      + (possessionAway - 50) * 0.003
      + awayApproach.shotQualityBias * 0.65
      + awayIntensity.shotQualityBonus
      + awayStrengthTier.composureBonus
      + randRange(-0.04, 0.05),
    0.24,
    0.42
  );
  var shotsOnTargetHome = shotEventsOnTargetHome + Math.round(extraShotsHome * shootingAccuracyHome);
  var shotsOnTargetAway = shotEventsOnTargetAway + Math.round(extraShotsAway * shootingAccuracyAway);

  shotsOnTargetHome = clamp(shotsOnTargetHome, homeGoals, shotsHome);
  shotsOnTargetAway = clamp(shotsOnTargetAway, awayGoals, shotsAway);

  var homeAggression = aggressionLevelImpact(homeAggressionSetting)
    + levelImpact(homeMotivation, { low: -0.4, medium: 0.4, high: 1.2 })
    + homeIntensity.aggressionBonus
    + levelImpact(homeFatigue, { none: 0, low: 0.5, medium: 1.2, high: 2.2 });
  var awayAggression = aggressionLevelImpact(awayAggressionSetting)
    + levelImpact(awayMotivation, { low: -0.4, medium: 0.4, high: 1.2 })
    + awayIntensity.aggressionBonus
    + levelImpact(awayFatigue, { none: 0, low: 0.5, medium: 1.2, high: 2.2 });
  var foulsHome = Math.round(randRange(8, 12) + homeAggression + (50 - possessionHome) * 0.08);
  var foulsAway = Math.round(randRange(8, 12) + awayAggression + (50 - possessionAway) * 0.08);
  foulsHome = clamp(Math.max(foulsHome, foulEventsHome + 2), foulEventsHome, 20);
  foulsAway = clamp(Math.max(foulsAway, foulEventsAway + 2), foulEventsAway, 20);

  var cornersHome = Math.round(
    shotsHome * randRange(0.18, 0.3) + (possessionHome - 50) * 0.08 + homeApproach.cornerBias + randRange(-1, 1.5)
  );
  var cornersAway = Math.round(
    shotsAway * randRange(0.18, 0.3) + (possessionAway - 50) * 0.08 + awayApproach.cornerBias + randRange(-1, 1.5)
  );
  cornersHome = clamp(cornersHome, 0, 12);
  cornersAway = clamp(cornersAway, 0, 12);

  var shotQualityHome = clamp(
    0.045
      + shares.homeShare * 0.06
      + (possessionHome - 50) * 0.001
      + homeApproach.shotQualityBias
      + homeIntensity.shotQualityBonus
      + homeStrengthTier.composureBonus * 0.9
      + randRange(-0.01, 0.015),
    0.05,
    0.14
  );
  var shotQualityAway = clamp(
    0.045
      + shares.awayShare * 0.06
      + (possessionAway - 50) * 0.001
      + awayApproach.shotQualityBias
      + awayIntensity.shotQualityBonus
      + awayStrengthTier.composureBonus * 0.9
      + randRange(-0.01, 0.015),
    0.05,
    0.14
  );
  var xgHome = Math.max(homeGoals * 0.3, eventsXGHome + extraShotsHome * shotQualityHome);
  var xgAway = Math.max(awayGoals * 0.3, eventsXGAway + extraShotsAway * shotQualityAway);

  function addCardEvents(team, count, cardType) {
    var teamName = team === "home" ? homeTeam : awayTeam;
    for (var idx = 0; idx < count; idx += 1) {
      var minute = pickUnusedMinute();
      if (minute === null) {
        break;
      }
      events.push({
        minute: minute,
        team: team,
        type: cardType,
        text: minute + "' " + (cardType === "redCard" ? "🟥 Red card" : "🟨 Yellow card") + " for " + teamName,
        xg: 0
      });
    }
  }

  var yellowCardsHome = clamp(
    Math.round(
      (foulsHome * randRange(0.14, 0.22) + homeAggression * 0.5 + randRange(-0.4, 0.8))
      * homeIntensity.cardRiskMultiplier
    ),
    0,
    4
  );
  var yellowCardsAway = clamp(
    Math.round(
      (foulsAway * randRange(0.14, 0.22) + awayAggression * 0.5 + randRange(-0.4, 0.8))
      * awayIntensity.cardRiskMultiplier
    ),
    0,
    4
  );
  var redCardsHome = Math.random() < clamp(
    (0.01 + Math.max(0, homeAggression) * 0.03 + Math.max(0, foulsHome - 11) * 0.012) * homeIntensity.cardRiskMultiplier,
    0.01,
    0.22
  ) ? 1 : 0;
  var redCardsAway = Math.random() < clamp(
    (0.01 + Math.max(0, awayAggression) * 0.03 + Math.max(0, foulsAway - 11) * 0.012) * awayIntensity.cardRiskMultiplier,
    0.01,
    0.22
  ) ? 1 : 0;

  if (redCardsHome && yellowCardsHome > 0) yellowCardsHome -= 1;
  if (redCardsAway && yellowCardsAway > 0) yellowCardsAway -= 1;

  addCardEvents("home", yellowCardsHome, "yellowCard");
  addCardEvents("away", yellowCardsAway, "yellowCard");
  addCardEvents("home", redCardsHome, "redCard");
  addCardEvents("away", redCardsAway, "redCard");

  events.sort(function (a, b) { return a.minute - b.minute; });

  xgHome = Math.max(0, parseFloat(xgHome.toFixed(2)));
  xgAway = Math.max(0, parseFloat(xgAway.toFixed(2)));

  var stats = {
    possession: { home: possessionHome, away: possessionAway },
    shots: { home: shotsHome, away: shotsAway },
    shotsOnTarget: { home: shotsOnTargetHome, away: shotsOnTargetAway },
    fouls: { home: foulsHome, away: foulsAway },
    corners: { home: cornersHome, away: cornersAway },
    xG: { home: xgHome, away: xgAway }
  };

  return {
    homeTeam: homeTeam,
    awayTeam: awayTeam,
    homeGoals: homeGoals,
    awayGoals: awayGoals,
    events: events,
    stats: stats
  };
}

function clearNarrationTimers() {
  while (narrationTimers.length) {
    clearTimeout(narrationTimers.pop());
  }
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickFromHat(category) {
  var options = NARRATION_HAT[category] || [];
  if (!options.length) {
    return "";
  }
  return options[randomInt(0, options.length - 1)];
}

function buildNarrationSequence(eventData, match) {
  var isHome = eventData.team === "home";
  var attackingTeam = isHome ? match.homeTeam : match.awayTeam;
  var p1 = "Player " + randomInt(2, 9);
  var p2 = "Player " + randomInt(10, 20);

  if (eventData.type === "goal") {
    return [
      eventData.minute + "': " + p1 + " from " + attackingTeam + " passes to " + p2 + " at the edge of the box...",
      pickFromHat("goal"),
      "GOAL! " + attackingTeam + " score!"
    ];
  }

  if (eventData.type === "postHit") {
    return [
      eventData.minute + "': " + p1 + " drives forward for " + attackingTeam + "...",
      p2 + " decides to shoot the ball!",
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

  return [
    eventData.minute + "': " + pickFromHat("chance"),
    p2 + " decides to shoot the ball!",
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

  var submitButton = document.querySelector("#simulator-form button[type='submit']");
  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = "Live Match Running...";
  }

  var minute = 0;
  var homeGoals = 0;
  var awayGoals = 0;
  var nextEventIndex = 0;
  var speedMs = 220;

  liveMatchTimer = setInterval(function () {
    if (matchClockPaused) {
      return;
    }

    minute += 1;

    while (nextEventIndex < match.events.length && match.events[nextEventIndex].minute <= minute) {
      var eventData = match.events[nextEventIndex];
      if (eventData.type === "goal" && eventData.team === "home") {
        homeGoals += 1;
      } else if (eventData.type === "goal" && eventData.team === "away") {
        awayGoals += 1;
      }

      var item = document.createElement("li");
      item.textContent = eventData.text;
      eventsList.appendChild(item);
      playNarration(eventData, match);
      nextEventIndex += 1;
    }

    scoreline.textContent = minute + "'  |  " + homeGoals + " - " + awayGoals;

    if (minute >= 90) {
      clearInterval(liveMatchTimer);
      liveMatchTimer = null;
      matchClockPaused = false;

      if (!match.events.length) {
        var noGoalItem = document.createElement("li");
        noGoalItem.textContent = "No goals scored.";
        eventsList.appendChild(noGoalItem);
        if (narrationText) {
          narrationText.textContent = "The match ends quietly with no major chances converted.";
        }
      } else if (narrationText) {
        narrationText.textContent = pickFromHat("fullTime");
      }

      scoreline.textContent = "FT  |  " + homeGoals + " - " + awayGoals;
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "Simulate Match";
      }
    }
  }, speedMs);
}

document.getElementById("simulator-form").addEventListener("submit", function (event) {
  event.preventDefault();

  var homeTeam = document.getElementById("homeTeam").value.trim() || "Home FC";
  var awayTeam = document.getElementById("awayTeam").value.trim() || "Away FC";
  var homeStrength = Number(document.getElementById("homeStrength").value || 70);
  var awayStrength = Number(document.getElementById("awayStrength").value || 70);
  var homeSupport = document.getElementById("homeSupport").value;
  var awaySupport = document.getElementById("awaySupport").value;
  var homeMotivation = document.getElementById("homeMotivation").value;
  var awayMotivation = document.getElementById("awayMotivation").value;
  var homeFatigue = document.getElementById("homeFatigue").value;
  var awayFatigue = document.getElementById("awayFatigue").value;
  var homeAggression = document.getElementById("homeAggression").value;
  var awayAggression = document.getElementById("awayAggression").value;
  var homeApproach = document.getElementById("homeApproach").value;
  var awayApproach = document.getElementById("awayApproach").value;
  var homeIntensity = document.getElementById("homeIntensity").value;
  var awayIntensity = document.getElementById("awayIntensity").value;

  homeStrength = clamp(homeStrength, 1, 100);
  awayStrength = clamp(awayStrength, 1, 100);

  document.getElementById("homeStrength").value = homeStrength;
  document.getElementById("awayStrength").value = awayStrength;

  var result = simulateMatch(
    homeTeam,
    awayTeam,
    homeStrength,
    awayStrength,
    homeSupport,
    awaySupport,
    homeMotivation,
    awayMotivation,
    homeFatigue,
    awayFatigue,
    homeAggression,
    awayAggression,
    homeApproach,
    awayApproach,
    homeIntensity,
    awayIntensity
  );
  // Store the generated match result and open the standalone result page.
  try {
    sessionStorage.setItem("lastMatchResult", JSON.stringify(result));
  } catch (e) {
    console.warn("Could not save match result to sessionStorage", e);
  }
  window.location.href = "result.html";
});


