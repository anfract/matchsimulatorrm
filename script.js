function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

var NATIONS_LEAGUES = [
  { country: "Albania", flag: "🇦🇱", leagues: ["Kategoria Superiore", "Kategoria e Pare", "Kategoria e Dyte"] },
  { country: "Andorra", flag: "🇦🇩", leagues: ["Primera Divisio", "Segona Divisio"] },
  { country: "Armenia", flag: "🇦🇲", leagues: ["Armenian Premier League", "Armenian First League"] },
  { country: "Austria", flag: "🇦🇹", leagues: ["Austrian Bundesliga", "2. Liga", "Regionalliga"] },
  { country: "Azerbaijan", flag: "🇦🇿", leagues: ["Azerbaijan Premier League", "Azerbaijan First Division"] },
  { country: "Belarus", flag: "🇧🇾", leagues: ["Belarusian Premier League", "Belarusian First League"] },
  { country: "Belgium", flag: "🇧🇪", leagues: ["Belgian Pro League", "Challenger Pro League", "Belgian National Division 1"] },
  { country: "Bosnia and Herzegovina", flag: "🇧🇦", leagues: ["Premier League of Bosnia and Herzegovina", "First League of FBiH", "First League of RS"] },
  { country: "Bulgaria", flag: "🇧🇬", leagues: ["First Professional Football League", "Second Professional Football League"] },
  { country: "Croatia", flag: "🇭🇷", leagues: ["SuperSport HNL", "Prva NL", "Druga NL"] },
  { country: "Cyprus", flag: "🇨🇾", leagues: ["Cypriot First Division", "Cypriot Second Division"] },
  { country: "Czech Republic", flag: "🇨🇿", leagues: ["Czech First League", "Czech National Football League"] },
  { country: "Denmark", flag: "🇩🇰", leagues: ["Danish Superliga", "Danish 1st Division", "Danish 2nd Division"] },
  { country: "England", flag: "🏴", leagues: ["Premier League", "Championship", "League One", "League Two", "National League"] },
  { country: "Estonia", flag: "🇪🇪", leagues: ["Meistriliiga", "Esiliiga", "Esiliiga B"] },
  { country: "Faroe Islands", flag: "🇫🇴", leagues: ["Faroe Islands Premier League", "1. deild"] },
  { country: "Finland", flag: "🇫🇮", leagues: ["Veikkausliiga", "Ykkosliiga", "Kakkonen"] },
  { country: "France", flag: "🇫🇷", leagues: ["Ligue 1", "Ligue 2", "National"] },
  { country: "Georgia", flag: "🇬🇪", leagues: ["Erovnuli Liga", "Erovnuli Liga 2"] },
  { country: "Germany", flag: "🇩🇪", leagues: ["Bundesliga", "2. Bundesliga", "3. Liga"] },
  { country: "Gibraltar", flag: "🇬🇮", leagues: ["Gibraltar Football League", "Intermediate League"] },
  { country: "Greece", flag: "🇬🇷", leagues: ["Super League Greece", "Super League Greece 2"] },
  { country: "Hungary", flag: "🇭🇺", leagues: ["Nemzeti Bajnoksag I", "Nemzeti Bajnoksag II"] },
  { country: "Iceland", flag: "🇮🇸", leagues: ["Bestu deild karla", "1. deild karla"] },
  { country: "Israel", flag: "🇮🇱", leagues: ["Israeli Premier League", "Liga Leumit"] },
  { country: "Italy", flag: "🇮🇹", leagues: ["Serie A", "Serie B", "Serie C"] },
  { country: "Kazakhstan", flag: "🇰🇿", leagues: ["Kazakhstan Premier League", "Kazakhstan First Division"] },
  { country: "Kosovo", flag: "🇽🇰", leagues: ["Football Superleague of Kosovo", "First Football League of Kosovo"] },
  { country: "Latvia", flag: "🇱🇻", leagues: ["Latvian Higher League", "Latvian First League"] },
  { country: "Lithuania", flag: "🇱🇹", leagues: ["A Lyga", "I Lyga"] },
  { country: "Luxembourg", flag: "🇱🇺", leagues: ["Luxembourg National Division", "Luxembourg Division of Honour"] },
  { country: "Malta", flag: "🇲🇹", leagues: ["Maltese Premier League", "Challenge League"] },
  { country: "Moldova", flag: "🇲🇩", leagues: ["Moldovan Super Liga", "Liga 1"] },
  { country: "Montenegro", flag: "🇲🇪", leagues: ["Montenegrin First League", "Montenegrin Second League"] },
  { country: "Netherlands", flag: "🇳🇱", leagues: ["Eredivisie", "Eerste Divisie", "Tweede Divisie"] },
  { country: "North Macedonia", flag: "🇲🇰", leagues: ["Macedonian First Football League", "Macedonian Second Football League"] },
  { country: "Northern Ireland", flag: "🇬🇧", leagues: ["NIFL Premiership", "NIFL Championship"] },
  { country: "Norway", flag: "🇳🇴", leagues: ["Eliteserien", "OBOS-ligaen", "2. divisjon"] },
  { country: "Poland", flag: "🇵🇱", leagues: ["Ekstraklasa", "I liga", "II liga"] },
  { country: "Portugal", flag: "🇵🇹", leagues: ["Primeira Liga", "Liga Portugal 2", "Liga 3"] },
  { country: "Republic of Ireland", flag: "🇮🇪", leagues: ["League of Ireland Premier Division", "League of Ireland First Division"] },
  { country: "Romania", flag: "🇷🇴", leagues: ["Liga I", "Liga II"] },
  { country: "Russia", flag: "🇷🇺", leagues: ["Russian Premier League", "Russian First League", "Russian Second League"] },
  { country: "San Marino", flag: "🇸🇲", leagues: ["Campionato Sammarinese", "San Marino Seconda Categoria"] },
  { country: "Scotland", flag: "🏴", leagues: ["Scottish Premiership", "Scottish Championship", "Scottish League One", "Scottish League Two"] },
  { country: "Serbia", flag: "🇷🇸", leagues: ["Serbian SuperLiga", "Serbian First League"] },
  { country: "Slovakia", flag: "🇸🇰", leagues: ["Slovak First Football League", "2. Liga"] },
  { country: "Slovenia", flag: "🇸🇮", leagues: ["Slovenian PrvaLiga", "Slovenian Second League"] },
  { country: "Spain", flag: "🇪🇸", leagues: ["La Liga", "Segunda Division", "Primera Federacion"] },
  { country: "Sweden", flag: "🇸🇪", leagues: ["Allsvenskan", "Superettan", "Ettan"] },
  { country: "Switzerland", flag: "🇨🇭", leagues: ["Swiss Super League", "Swiss Challenge League", "Promotion League"] },
  { country: "Turkey", flag: "🇹🇷", leagues: ["Super Lig", "1. Lig", "2. Lig"] },
  { country: "Ukraine", flag: "🇺🇦", leagues: ["Ukrainian Premier League", "Ukrainian First League"] },
  { country: "Wales", flag: "🏴", leagues: ["Cymru Premier", "Cymru North", "Cymru South"] }
];

var COUNTRY_RANKINGS = [
  "Argentina",
  "France",
  "Spain",
  "England",
  "Brazil",
  "Portugal",
  "Netherlands",
  "Belgium",
  "Italy",
  "Germany"
];

var CLUB_RANKINGS = [
  "Real Madrid",
  "Manchester City",
  "Bayern Munich",
  "Inter Milan",
  "Liverpool",
  "Arsenal",
  "Barcelona",
  "Paris Saint-Germain",
  "Atletico Madrid",
  "Bayer Leverkusen"
];

var leagueClubsCache = {};
var COUNTRY_MATCH_ALIASES = {
  "Bosnia and Herzegovina": ["bosnia", "bosnia and herzegovina"],
  "Czech Republic": ["czech republic", "czechia", "czech"],
  "Republic of Ireland": ["ireland", "republic of ireland"],
  "North Macedonia": ["north macedonia", "macedonia"],
  "Northern Ireland": ["northern ireland"],
  "Faroe Islands": ["faroe islands", "faroe"],
  "Russia": ["russia", "russian federation"],
  "Wales": ["wales"],
  "England": ["england"],
  "Scotland": ["scotland"],
  "Turkey": ["turkey", "turkiye"]
};
var COUNTRY_API_NAMES = {
  "Bosnia and Herzegovina": "Bosnia",
  "Czech Republic": "Czechia",
  "Republic of Ireland": "Ireland",
  "North Macedonia": "Macedonia",
  "Northern Ireland": "N. Ireland",
  "Faroe Islands": "Faroe",
  "Russia": "Russian Federation",
  "Wales": "Wales",
  "England": "England",
  "Scotland": "Scotland"
};
var MANUAL_LEAGUE_CLUBS = {
  "Czech Republic": {
    "Czech First League": [
      "Slavia Prague",
      "Sparta Prague",
      "Viktoria Plzen",
      "Banik Ostrava",
      "Mlada Boleslav",
      "Sigma Olomouc",
      "Slovan Liberec",
      "Bohemians 1905",
      "Teplice",
      "Hradec Kralove",
      "Jablonec",
      "Slovacko",
      "Pardubice",
      "Karvina",
      "Ceske Budejovice",
      "Dukla Prague"
    ],
    "Czech National Football League": [
      "Zbrojovka Brno",
      "Vyskov",
      "Pribram",
      "Prostejov",
      "Lisen",
      "Vlasim",
      "Opava",
      "Taborsko",
      "Sparta Prague B",
      "Slavia Prague B",
      "Sigma Olomouc B",
      "Viktoria Zizkov",
      "Jihlava",
      "Chrudim",
      "Zlin",
      "Artis Brno"
    ]
  }
};
var COUNTRY_CLUB_POOLS = {
  "Albania": ["KF Tirana", "Partizani Tirana", "Vllaznia Shkoder", "Skenderbeu", "Dinamo City", "Teuta Durres"],
  "Andorra": ["FC Santa Coloma", "Inter Club d'Escaldes", "UE Santa Coloma", "Atletic Escaldes", "FC Ordino", "Penya Encarnada"],
  "Armenia": ["Pyunik", "Ararat-Armenia", "Urartu", "Noah", "Alashkert", "Shirak"],
  "Austria": ["Red Bull Salzburg", "Sturm Graz", "Rapid Wien", "Austria Wien", "LASK", "Wolfsberger AC"],
  "Azerbaijan": ["Qarabag", "Neftci Baku", "Sabah", "Zira", "Sumqayit", "Gabala"],
  "Belarus": ["BATE Borisov", "Dinamo Minsk", "Shakhtyor Soligorsk", "Neman Grodno", "Torpedo-BelAZ", "Isloch"],
  "Belgium": ["Club Brugge", "Anderlecht", "Union Saint-Gilloise", "Genk", "Gent", "Antwerp"],
  "Bosnia and Herzegovina": ["Zrinjski Mostar", "FK Sarajevo", "Zeljeznicar", "Borac Banja Luka", "Velez Mostar", "Siroki Brijeg"],
  "Bulgaria": ["Ludogorets", "CSKA Sofia", "Levski Sofia", "Lokomotiv Plovdiv", "Cherno More", "Botev Plovdiv"],
  "Croatia": ["Dinamo Zagreb", "Hajduk Split", "Rijeka", "Osijek", "Varazdin", "Slaven Belupo"],
  "Cyprus": ["APOEL", "Omonia", "AEL Limassol", "Apollon Limassol", "Pafos", "Anorthosis"],
  "Czech Republic": ["Sparta Prague", "Slavia Prague", "Viktoria Plzen", "Banik Ostrava", "Sigma Olomouc", "Slovan Liberec"],
  "Denmark": ["Copenhagen", "Midtjylland", "Brondby", "Nordsjaelland", "Aarhus GF", "Randers"],
  "England": ["Arsenal", "Aston Villa", "Bournemouth", "Brentford", "Brighton", "Chelsea", "Crystal Palace", "Everton", "Fulham", "Ipswich Town", "Leicester City", "Liverpool", "Manchester City", "Manchester United", "Newcastle United", "Nottingham Forest", "Southampton", "Tottenham", "West Ham", "Wolves"],
  "Estonia": ["Flora", "Levadia", "Nomme Kalju", "Paide Linnameeskond", "Trans Narva", "Tammeka"],
  "Faroe Islands": ["KI Klaksvik", "HB Torshavn", "B36 Torshavn", "Vikingur", "NSI Runavik", "EB/Streymur"],
  "Finland": ["HJK", "KuPS", "Ilves", "SJK", "Inter Turku", "Honka"],
  "France": ["Paris Saint-Germain", "Marseille", "Monaco", "Lille", "Lyon", "Nice", "Lens", "Rennes"],
  "Georgia": ["Dinamo Tbilisi", "Dinamo Batumi", "Saburtalo", "Torpedo Kutaisi", "Dila Gori", "Samtredia"],
  "Germany": ["Bayern Munich", "Borussia Dortmund", "RB Leipzig", "Bayer Leverkusen", "Eintracht Frankfurt", "Stuttgart", "Wolfsburg", "Freiburg"],
  "Gibraltar": ["Lincoln Red Imps", "St Joseph's", "Europa FC", "Mons Calpe", "Manchester 62", "Lynx"],
  "Greece": ["Olympiacos", "PAOK", "AEK Athens", "Panathinaikos", "Aris", "Atromitos"],
  "Hungary": ["Ferencvaros", "Puskas Akademia", "Fehervar", "Debrecen", "MTK Budapest", "Kecskemeti TE"],
  "Iceland": ["Valur", "Breidablik", "Vikingur Reykjavik", "FH", "KR Reykjavik", "Stjarnan"],
  "Israel": ["Maccabi Tel Aviv", "Hapoel Beer Sheva", "Maccabi Haifa", "Beitar Jerusalem", "Hapoel Tel Aviv", "Bnei Sakhnin"],
  "Italy": ["Inter Milan", "AC Milan", "Juventus", "Napoli", "Roma", "Lazio", "Atalanta", "Fiorentina"],
  "Kazakhstan": ["Astana", "Kairat", "Ordabasy", "Aktobe", "Tobol", "Kyzylzhar"],
  "Kosovo": ["Ballkani", "Prishtina", "Drita", "Gjilani", "Dukagjini", "Llapi"],
  "Latvia": ["Riga FC", "RFS", "Liepaja", "Valmiera", "Auda", "Metta"],
  "Lithuania": ["Zalgiris", "Kauno Zalgiris", "Panevezys", "Suduva", "Banga", "Hegelmann"],
  "Luxembourg": ["F91 Dudelange", "Racing FC Union", "Differdange 03", "Swift Hesperange", "Progres Niederkorn", "Jeunesse Esch"],
  "Malta": ["Hamrun Spartans", "Hibernians", "Floriana", "Birkirkara", "Sliema Wanderers", "Gzira United"],
  "Moldova": ["Sheriff Tiraspol", "Petrocub", "Zimbru Chisinau", "Milsami", "Dacia Buiucani", "Sfintul Gheorghe"],
  "Montenegro": ["Budućnost Podgorica", "Sutjeska", "Decic", "Mornar", "Jezero", "Arsenal Tivat"],
  "Netherlands": ["Ajax", "PSV", "Feyenoord", "AZ", "Twente", "Utrecht", "Heerenveen", "Sparta Rotterdam"],
  "North Macedonia": ["Shkendija", "Rabotnicki", "Vardar", "Sileks", "Shkupi", "Struga"],
  "Northern Ireland": ["Linfield", "Glentoran", "Cliftonville", "Larne", "Crusaders", "Coleraine"],
  "Norway": ["Bodo/Glimt", "Molde", "Rosenborg", "Viking", "Brann", "Lillestrom"],
  "Poland": ["Legia Warsaw", "Lech Poznan", "Rakow Czestochowa", "Pogon Szczecin", "Jagiellonia", "Cracovia"],
  "Portugal": ["Benfica", "Porto", "Sporting CP", "Braga", "Vitoria Guimaraes", "Boavista"],
  "Republic of Ireland": ["Shamrock Rovers", "Derry City", "Bohemians", "St Patrick's Athletic", "Shelbourne", "Dundalk"],
  "Romania": ["FCSB", "CFR Cluj", "Universitatea Craiova", "Rapid Bucuresti", "Farul Constanta", "Sepsi"],
  "Russia": ["Zenit", "Spartak Moscow", "CSKA Moscow", "Dynamo Moscow", "Lokomotiv Moscow", "Krasnodar"],
  "San Marino": ["Tre Fiori", "La Fiorita", "Folgore", "Tre Penne", "Domagnano", "Murata"],
  "Scotland": ["Celtic", "Rangers", "Hearts", "Hibernian", "Aberdeen", "Kilmarnock"],
  "Serbia": ["Red Star Belgrade", "Partizan", "TSC", "Vojvodina", "Cukaricki", "Radnicki Nis"],
  "Slovakia": ["Slovan Bratislava", "DAC 1904", "Spartak Trnava", "Zilina", "Ruzomberok", "Banska Bystrica"],
  "Slovenia": ["Maribor", "Olimpija Ljubljana", "Celje", "Mura", "Koper", "Domzale"],
  "Spain": ["Real Madrid", "Barcelona", "Atletico Madrid", "Sevilla", "Villarreal", "Real Sociedad", "Athletic Club", "Valencia"],
  "Sweden": ["Malmo FF", "AIK", "Djurgarden", "Hammarby", "Elfsborg", "Hacken"],
  "Switzerland": ["Young Boys", "Basel", "Zurich", "Lugano", "Servette", "St Gallen"],
  "Turkey": ["Galatasaray", "Fenerbahce", "Besiktas", "Trabzonspor", "Basaksehir", "Adana Demirspor"],
  "Ukraine": ["Shakhtar Donetsk", "Dynamo Kyiv", "Dnipro-1", "Kryvbas", "Vorskla Poltava", "Zorya Luhansk"],
  "Wales": ["The New Saints", "Connah's Quay", "Bala Town", "Cardiff Met", "Penybont", "Haverfordwest County"]
};
var LEAGUE_API_NAMES = {
  "Premier League": "English Premier League",
  "Championship": "English League Championship",
  "League One": "English League 1",
  "League Two": "English League 2",
  "National League": "National League",
  "Serie A": "Italian Serie A",
  "Serie B": "Italian Serie B",
  "Ligue 1": "French Ligue 1",
  "Ligue 2": "French Ligue 2",
  "La Liga": "Spanish La Liga",
  "Bundesliga": "German Bundesliga",
  "2. Bundesliga": "German 2. Bundesliga",
  "Eredivisie": "Dutch Eredivisie",
  "Primeira Liga": "Portuguese Primeira Liga",
  "Scottish Premiership": "Scottish Premier League",
  "Scottish Championship": "Scottish Championship",
  "Belgian Pro League": "Belgian Pro League",
  "Super Lig": "Turkish Super Lig",
  "Swiss Super League": "Swiss Super League",
  "Austrian Bundesliga": "Austrian Bundesliga",
  "Ekstraklasa": "Polish Ekstraklasa",
  "I liga": "Polish I liga",
  "II liga": "Polish II liga",
  "Allsvenskan": "Swedish Allsvenskan",
  "Superettan": "Swedish Superettan",
  "Ettan": "Swedish Ettan",
  "Eliteserien": "Norwegian Eliteserien",
  "OBOS-ligaen": "Norwegian OBOS-ligaen",
  "2. divisjon": "Norwegian 2. divisjon",
  "Super League Greece": "Greek Superleague",
  "Ukrainian Premier League": "Ukrainian Premier League",
  "2. Liga": "Austrian 2. Liga",
  "Regionalliga": "Austrian Regionalliga",
  "Azerbaijan Premier League": "Azerbaijan Premier League",
  "Belarusian Premier League": "Belarusian Premier League",
  "Challenger Pro League": "Belgian First Division B",
  "Belgian National Division 1": "Belgian National Division 1",
  "Luxembourg Division of Honour": "Luxembourg Division of Honour",
  "Challenge League": "Maltese Challenge League",
  "Kazakhstan First Division": "Kazakhstan First Division",
  "Eerste Divisie": "Dutch Eerste Divisie",
  "Tweede Divisie": "Dutch Tweede Divisie",
  "Liga Portugal 2": "Liga Portugal 2",
  "Liga 3": "Portuguese Liga 3",
  "Russian First League": "Russian First League",
  "Russian Second League": "Russian Second League",
  "Scottish League One": "Scottish League One",
  "Scottish League Two": "Scottish League Two",
  "Segunda Division": "Spanish Segunda Division",
  "Primera Federacion": "Spanish Primera Federacion",
  "Promotion League": "Swiss Promotion League",
  "1. Lig": "Turkish 1. Lig",
  "2. Lig": "Turkish 2. Lig",
  "Macedonian Second Football League": "Macedonian Second League"
};
var LEAGUE_NAME_ALIASES = {
  "Championship": ["EFL Championship", "English League Championship"],
  "League One": ["EFL League One", "English League 1"],
  "League Two": ["EFL League Two", "English League 2"],
  "Premier League": ["English Premier League"],
  "National League": ["National League (England)", "Vanarama National League", "English National League"],
  "Primeira Liga": ["Liga Portugal", "Portuguese Primeira Liga"],
  "Super Lig": ["Turkish Super Lig", "Super Lig Turkey"],
  "Czech First League": ["Czech Liga", "Fortuna Liga"],
  "Czech National Football League": ["Czech National League", "FNL"],
  "Swiss Super League": ["Super League Switzerland"],
  "2. Liga": ["Austrian 2. Liga", "2 Liga Austria", "2nd Liga Austria"],
  "Regionalliga": ["Austrian Regionalliga", "Regionalliga Austria"],
  "Azerbaijan Premier League": ["Misli Premyer Liqasi"],
  "Belarusian Premier League": ["Belarus Premier League"],
  "Challenger Pro League": ["Belgian Challenger Pro League", "Belgian First Division B"],
  "Belgian National Division 1": ["Belgian Division 1 Amateur"],
  "Kazakhstan First Division": ["Kazakhstan 1st Division"],
  "Luxembourg Division of Honour": ["Luxembourg Honour Division"],
  "Challenge League": ["Maltese Challenge League", "Malta Challenge League"],
  "Eerste Divisie": ["Dutch Eerste Divisie", "Keuken Kampioen Divisie"],
  "Tweede Divisie": ["Dutch Tweede Divisie"],
  "OBOS-ligaen": ["Norwegian OBOS League", "OBOS Ligaen"],
  "2. divisjon": ["Norwegian 2nd Division", "Norway 2. divisjon"],
  "I liga": ["Polish I Liga", "Betclic 1 Liga"],
  "II liga": ["Polish II Liga", "Betclic 2 Liga"],
  "Liga Portugal 2": ["Portuguese Segunda Liga", "Liga Portugal SABSEG"],
  "Liga 3": ["Portuguese Liga 3", "Liga 3 Portugal"],
  "Russian First League": ["Russian Football National League", "FNL Russia"],
  "Russian Second League": ["Russian Second League A", "Russian Second League B"],
  "Scottish Premiership": ["Scottish Premiership", "Premiership Scotland"],
  "Scottish League One": ["Scottish League 1"],
  "Scottish League Two": ["Scottish League 2"],
  "2. Liga": ["Slovak 2. Liga", "Austrian 2. Liga"],
  "Segunda Division": ["LaLiga Hypermotion", "Spanish Segunda"],
  "Primera Federacion": ["Spanish Primera Federacion", "Primera RFEF"],
  "Superettan": ["Swedish Superettan"],
  "Ettan": ["Swedish Ettan Norra", "Swedish Ettan Sodra"],
  "Promotion League": ["Swiss Promotion League", "Switzerland Promotion League"],
  "1. Lig": ["Turkish 1. Lig", "Trendyol 1. Lig"],
  "2. Lig": ["Turkish 2. Lig", "Nesine 2. Lig"],
  "Macedonian First Football League": ["North Macedonia First League", "Macedonian First League"],
  "Macedonian Second Football League": ["North Macedonia Second League", "Macedonian Second League"]
};

function setupTabs() {
  var tabButtons = document.querySelectorAll(".tab-button");
  var tabPanels = document.querySelectorAll(".tab-panel");

  tabButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var tabName = button.getAttribute("data-tab");

      tabButtons.forEach(function (btn) {
        btn.classList.remove("active");
      });
      tabPanels.forEach(function (panel) {
        panel.classList.remove("active");
      });

      button.classList.add("active");
      var targetPanel = document.getElementById("tab-" + tabName);
      if (targetPanel) {
        targetPanel.classList.add("active");
      }
    });
  });
}

function renderNationsLeagues() {
  var container = document.getElementById("nationsLeagues");
  if (!container) {
    return;
  }

  container.innerHTML = "";
  NATIONS_LEAGUES.forEach(function (nation) {
    var details = document.createElement("details");
    details.className = "nation";

    var summary = document.createElement("summary");
    summary.textContent = nation.country + " " + nation.flag;
    details.appendChild(summary);

    var leaguesList = document.createElement("ul");
    nation.leagues.forEach(function (league) {
      var item = document.createElement("li");
      var leagueButton = document.createElement("button");
      leagueButton.type = "button";
      leagueButton.className = "league-button";
      leagueButton.textContent = league;
      leagueButton.addEventListener("click", function (event) {
        event.preventDefault();
        loadLeagueClubs(nation.country, league);
      });
      item.appendChild(leagueButton);
      leaguesList.appendChild(item);
    });

    details.appendChild(leaguesList);
    container.appendChild(details);
  });
}

function getLeagueApiName(leagueName) {
  return LEAGUE_API_NAMES[leagueName] || leagueName;
}

function normalizeValue(value) {
  return String(value || "").toLowerCase().trim();
}

function normalizeKey(value) {
  return String(value || "").toLowerCase().replace(/[^a-z0-9]/g, "");
}

function teamMatchesCountry(team, country) {
  var teamCountry = normalizeValue(team.strCountry);
  if (!teamCountry) {
    return false;
  }
  var aliases = COUNTRY_MATCH_ALIASES[country] || [normalizeValue(country)];
  return aliases.some(function (alias) {
    return teamCountry === alias || teamCountry.includes(alias) || alias.includes(teamCountry);
  });
}

function extractClubNames(teams) {
  var unique = {};
  var clubs = [];
  teams.forEach(function (team) {
    var name = team && team.strTeam ? team.strTeam : "";
    if (!name || unique[name]) {
      return;
    }
    unique[name] = true;
    clubs.push(name);
  });
  return clubs.sort(function (a, b) { return a.localeCompare(b); });
}

function extractClubsForCountry(teams, country) {
  var strictMatches = teams.filter(function (team) {
    return teamMatchesCountry(team, country);
  });
  if (strictMatches.length) {
    return extractClubNames(strictMatches);
  }

  // Some feeds omit country per team; if mostly blank, keep league list.
  var blankCountryCount = teams.filter(function (team) {
    return !normalizeValue(team.strCountry);
  }).length;
  if (teams.length >= 6 && blankCountryCount >= Math.floor(teams.length * 0.7)) {
    return extractClubNames(teams);
  }

  return [];
}

function fetchLeagueTeamsByName(leagueName) {
  var url = "https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=" + encodeURIComponent(leagueName);
  return fetch(url)
    .then(function (response) {
      if (!response.ok) {
        throw new Error("League request failed");
      }
      return response.json();
    })
    .then(function (data) {
      return data && data.teams ? data.teams : [];
    });
}

function getCountryApiName(country) {
  return COUNTRY_API_NAMES[country] || country;
}

function getLeagueSearchNames(league) {
  var names = [league, getLeagueApiName(league)];
  var aliases = LEAGUE_NAME_ALIASES[league] || [];
  return names.concat(aliases).filter(function (name, index, arr) {
    return name && arr.indexOf(name) === index;
  });
}

function pickLeagueIdFromCountryList(leagues, leagueName) {
  if (!leagues.length) {
    return "";
  }

  var targets = getLeagueSearchNames(leagueName).map(normalizeKey);
  for (var i = 0; i < leagues.length; i += 1) {
    var exactName = leagues[i] && leagues[i].strLeague ? leagues[i].strLeague : "";
    var exactId = leagues[i] && leagues[i].idLeague ? leagues[i].idLeague : "";
    var exactKey = normalizeKey(exactName);
    if (!exactId || !exactKey) {
      continue;
    }
    if (targets.indexOf(exactKey) !== -1) {
      return exactId;
    }
  }

  var bestId = "";
  var bestScore = -1;

  leagues.forEach(function (entry) {
    var id = entry && entry.idLeague ? entry.idLeague : "";
    var name = entry && entry.strLeague ? entry.strLeague : "";
    if (!id || !name) {
      return;
    }
    var nameKey = normalizeKey(name);
    var score = 0;
    targets.forEach(function (target) {
      if (!target) {
        return;
      }
      if (nameKey === target) {
        score = Math.max(score, 100);
      } else if (nameKey.includes(target) || target.includes(nameKey)) {
        score = Math.max(score, 70);
      }
    });
    if (score > bestScore) {
      bestScore = score;
      bestId = id;
    }
  });

  return bestScore >= 70 ? bestId : "";
}

function fetchLeagueTeamsByCountryIndex(country, league) {
  var countryName = getCountryApiName(country);
  var leaguesUrl = "https://www.thesportsdb.com/api/v1/json/3/search_all_leagues.php?c=" + encodeURIComponent(countryName) + "&s=Soccer";
  return fetch(leaguesUrl)
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Country league index failed");
      }
      return response.json();
    })
    .then(function (data) {
      var leagues = data && data.countries ? data.countries : [];
      var leagueId = pickLeagueIdFromCountryList(leagues, league);
      if (!leagueId) {
        return [];
      }
      var teamsUrl = "https://www.thesportsdb.com/api/v1/json/3/lookup_all_teams.php?id=" + encodeURIComponent(leagueId);
      return fetch(teamsUrl)
        .then(function (response) {
          if (!response.ok) {
            throw new Error("League teams by ID failed");
          }
          return response.json();
        })
        .then(function (teamsData) {
          return teamsData && teamsData.teams ? teamsData.teams : [];
        });
    });
}

function fetchLiveLeagueClubs(country, league) {
  var candidates = getLeagueSearchNames(league);
  var tryByName = function (index) {
    if (index >= candidates.length) {
      return Promise.resolve([]);
    }
    return fetchLeagueTeamsByName(candidates[index])
      .then(function (teams) {
        var clubs = extractClubsForCountry(teams, country);
        if (!clubs.length) {
          return tryByName(index + 1);
        }
        return clubs;
      })
      .catch(function () {
        return tryByName(index + 1);
      });
  };

  return tryByName(0).then(function (clubs) {
    if (clubs.length) {
      return clubs;
    }
    return fetchLeagueTeamsByCountryIndex(country, league)
      .then(function (teams) {
        var strictClubs = extractClubsForCountry(teams, country);
        if (strictClubs.length) {
          return strictClubs;
        }
        // Country-index + league-id source is already scoped; keep teams if needed.
        return extractClubNames(teams);
      })
      .catch(function () {
        return [];
      });
  });
}

function getManualLeagueClubs(country, league) {
  if (!MANUAL_LEAGUE_CLUBS[country]) {
    return [];
  }
  if (!MANUAL_LEAGUE_CLUBS[country][league]) {
    return [];
  }
  return MANUAL_LEAGUE_CLUBS[country][league].slice().sort(function (a, b) {
    return a.localeCompare(b);
  });
}

function renderLeagueClubs(country, league, clubs) {
  var panel = document.getElementById("leagueClubsPanel");
  var title = document.getElementById("clubsTitle");
  var list = document.getElementById("leagueClubs");
  if (!panel || !title || !list) {
    return;
  }

  title.textContent = country + " - " + league + " Clubs";
  list.innerHTML = "";
  if (!clubs.length) {
    var emptyItem = document.createElement("li");
    emptyItem.textContent = "No clubs found for this league.";
    list.appendChild(emptyItem);
  } else {
    clubs.forEach(function (clubName) {
      var item = document.createElement("li");
      item.textContent = clubName;
      list.appendChild(item);
    });
  }
  panel.classList.remove("hidden");
  panel.scrollIntoView({ behavior: "smooth", block: "start" });
}

function showLeagueClubsMessage(country, league, message) {
  renderLeagueClubs(country, league, [message]);
}

function loadLeagueClubs(country, league) {
  var cacheKey = country + "::" + league;
  if (leagueClubsCache[cacheKey]) {
    renderLeagueClubs(country, league, leagueClubsCache[cacheKey]);
    return;
  }

  showLeagueClubsMessage(country, league, "Loading verified clubs...");
  fetchLiveLeagueClubs(country, league).then(function (clubs) {
    if (clubs.length) {
      leagueClubsCache[cacheKey] = clubs;
      renderLeagueClubs(country, league, clubs);
      return;
    }

    var manualClubs = getManualLeagueClubs(country, league);
    if (manualClubs.length) {
      leagueClubsCache[cacheKey] = manualClubs;
      renderLeagueClubs(country, league, manualClubs);
      return;
    }

    renderLeagueClubs(country, league, [
      "Verification needed: live source did not return a country-matching club list for this league today."
    ]);
  });
}

function renderRankings(listId, rankings) {
  var list = document.getElementById(listId);
  if (!list) {
    return;
  }

  list.innerHTML = "";
  rankings.forEach(function (name) {
    var item = document.createElement("li");
    item.textContent = name;
    list.appendChild(item);
  });
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

setupTabs();
renderNationsLeagues();
renderRankings("countryRankings", COUNTRY_RANKINGS);
renderRankings("clubRankings", CLUB_RANKINGS);
