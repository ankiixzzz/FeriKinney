/**
 * Complete list of Nepal locations (cities, towns, municipalities)
 * All 7 provinces covered — used for searchable location dropdowns.
 */

const nepalLocations = [
  // Province No. 1 (Koshi)
  "Taplejung", "Phungling", "Sirijunga",
  "Phidim", "Miklajung", "Hilihang", "Falelung",
  "Ilam", "Deumai", "Mai", "Maijogmai", "Sandakpur", "Suryodaya",
  "Birtamod", "Bhadrapur", "Damak", "Mechinagar",
  "Arjundhara", "Budhabare", "Gauradaha", "Haldibari", "Kankai",
  "Charali",
  "Biratnagar", "Rangeli", "Sundarharaicha", "Urlabari",
  "Belbari", "Ratuwamai", "Pathari Shanischare", "Dhanpalthan",
  "Gramthan", "Jahada", "Kanepokhari", "Kerabari",
  "Letang Bhogateni", "Sunwarshi",
  "Dharan", "Itahari", "Inaruwa", "Duhabi", "Harinagar",
  "Barahakshetra", "Bhokraha Narsingh", "Dewanganj", "Ramdhuni",
  "Bhojpur", "Shadananda", "Aamchowk", "Arun", "Hatuwagadhi",
  "Pauwadungma",
  "Dhankuta", "Pakhribas", "Mahalaxmi",
  "Myanglung", "Aathrai Tribeni", "Fedap", "Laligurans", "Phedap",
  "Khandbari", "Chainpur", "Dharmadevi", "Madi", "Makalu",
  "Panchkhapan", "Sabhapokhari",
  "Salleri", "Solududhkunda", "Dudh Koshi", "Khumbu Pasanglahmu",
  "Mahakulung", "Nechasalyan", "Sotang",
  "Okhaldhunga", "Champadevi", "Chisankhugadhi", "Khijidemba",
  "Manebhanjyang", "Molung", "Siddhicharan",
  "Diktel", "Halesi Tuwachung", "Aiselukharka", "Barahapokhari",
  "Chisapani", "Jantedhunga", "Khotehang", "Lamidanda", "Rawabesi", "Sakela",
  "Gaighat", "Triyuga", "Belaka", "Chaudandigadhi", "Katari", "Tapli",

  // Province No. 2 (Madhesh)
  "Rajbiraj", "Kanchanrup", "Bodebarsain", "Dakneshwori",
  "Hanumannagar Kankalini", "Rajgadh", "Rupani", "Shambhunath",
  "Surunga", "Tilathi Koiladi",
  "Lahan", "Siraha", "Dhangadhimai", "Golbazar", "Mirchaiya", "Sukhipur",
  "Aurahi", "Bariyarpatti", "Bhagwanpur", "Karjanha", "Kalyanpur",
  "Lakshmipur Patari",
  "Janakpur", "Janakpurdham", "Dhanusadham", "Ganeshman Charnath",
  "Hansapur", "Lakshminiya", "Mithila", "Mithila Bihari", "Nagarain",
  "Sabaila", "Shahidnagar", "Bideha",
  "Jaleshwar", "Bardibas", "Balawa", "Bhangaha", "Ekdara", "Gaushala",
  "Loharpatti", "Mahottari", "Matihani", "Pipra", "Ramgopalpur",
  "Malangwa", "Balara", "Barahathawa", "Basbariya", "Bramhapuri",
  "Chandranagar", "Dhankaul", "Godaita", "Haripurwa", "Hariwan",
  "Ishworpur", "Kabilasi", "Lalbandi", "Parsa", "Ramnagar",
  "Gaur", "Baudhimai", "Brindaban", "Chandrapur", "Gadhimai", "Garuda",
  "Guruthwa", "Ishanath", "Katahariya", "Maulapur", "Paroha",
  "Rajdevi", "Rajpur", "Yamunamai",
  "Kalaiya", "Jitpur Simara", "Adarsha Kotwal", "Baragadhi",
  "Kolhabi", "Mahagadhimai", "Nijgadh", "Pheta", "Simraungadh",
  "Birgunj", "Parsagadhi", "Bahudarmai", "Bindabasini",
  "Jagarnathpur", "Jirabhawani", "Kalikamai", "Pokhariya",

  // Bagmati Province
  "Kathmandu", "Budhanilkantha", "Chandragiri", "Dakshinkali",
  "Gokarneshwar", "Kageshwori Manahara", "Kirtipur", "Nagarjun",
  "Shankharapur", "Tarakeshwar", "Tokha",
  "Bhaktapur", "Changunarayan", "Madhyapur Thimi", "Suryabinayak",
  "Lalitpur", "Godawari", "Mahalaxmi", "Konjyosom",
  "Dhulikhel", "Banepa", "Panauti", "Panchkhal", "Namobuddha",
  "Bethanchok", "Bhumlu", "Khanikhola", "Mandan Deupur",
  "Roshi", "Temal",
  "Chautara Sangachokgadhi", "Balephi", "Bhotekoshi", "Helambu",
  "Indrawati", "Jugal", "Melamchi", "Tripurasundari",
  "Dhunche", "Amachodingmo", "Gosaikunda", "Kalika", "Naukunda",
  "Bidur", "Belkotgadhi", "Dupcheshwar", "Kakani", "Panchakanya",
  "Suryagadhi", "Tadi",
  "Nilkantha", "Benighat Rorang", "Gajuri", "Galchi", "Gangajamuna",
  "Jwalamukhi", "Khaniyabas", "Siddhilek", "Thakre",
  "Hetauda", "Bakaiya", "Bhimphedi", "Bagmati", "Kailash",
  "Makwanpurgadhi", "Manahari", "Raksirang", "Thaha",
  "Bharatpur", "Ratnanagar", "Kalika", "Khairahani", "Rapti",
  "Manthali", "Doramba", "Gokulganga", "Khandadevi", "Ramechhap",
  "Sindhulimadi", "Dudhouli", "Ghanglekh", "Golanjor",
  "Hariharpurgadhi", "Kamalamai", "Marin", "Phikkal", "Tinpatan",
  "Charikot", "Bigu", "Bhimeshwor", "Baiteshwor", "Gaurishankar",
  "Jiri", "Kalinchok", "Melung",

  // Gandaki Province
  "Pokhara", "Annapurna", "Machhapuchchhre", "Rupa",
  "Damauli", "Byas", "Bhanu", "Devghat", "Ghiring",
  "Bandipur", "Anbukhaireni", "Marsyangdi",
  "Besisahar", "Dordi", "Dudhpokhari", "Sundarbazar",
  "Gorkha", "Ajirkot", "Arughat", "Palungtar",
  "Chame", "Jomsom", "Beni", "Kushma", "Kawasoti",
  "Devchuli", "Gaidakot", "Hupsekot",
  "Putalibazar", "Aandhikhola", "Bhirkot", "Chapakot",
  "Galyang", "Kaligandaki", "Waling",
  "Baglung", "Galkot", "Jaimini", "Musikot", "Tansen",

  // Lumbini Province
  "Bhairahawa", "Butwal", "Devdaha", "Gaidahawa",
  "Lumbini Sanskritik", "Mayadevi", "Sainamaina", "Tilottama",
  "Taulihawa", "Banganga", "Kapilvastu", "Krishnanagar", "Maharajgunj",
  "Bardaghat", "Palhinandan", "Pratappur", "Ramgram", "Sunwal",
  "Sandhikharka", "Bhumekasthan", "Chhatradev", "Panini",
  "Tamghas", "Chandrakot", "Gulmidarbar", "Musikot", "Resunga",
  "Pyuthan", "Liwang",
  "Ghorahi", "Tulsipur", "Lamahi", "Nepalgunj", "Kohalpur",
  "Gulariya", "Bansgadhi", "Barbardiya", "Rajapur", "Thakurbaba",

  // Karnali Province
  "Birendranagar", "Bheriganga", "Gurbhakot", "Lekhbesi",
  "Narayan", "Aathabis", "Bhairabi", "Dullu", "Naumule",
  "Khalanga", "Barekot", "Bheri", "Chhedagad", "Nalagad",
  "Dunai", "Gamgadhi", "Simikot",
  "Manma", "Naraharinath", "Raskot", "Tilagufa",
  "Chandannath", "Guthichaur", "Jumla",

  // Sudurpashchim Province
  "Dhangadhi", "Tikapur", "Bhajani", "Gauriganga",
  "Ghodaghodi", "Janaki", "Lamkichuha",
  "Mahendranagar", "Belauri", "Bedkot", "Bhimdatta",
  "Krishnapur", "Punarbas",
  "Amargadhi", "Bhageshwar", "Navadurga", "Parashuram",
  "Dasharathchand", "Dilasaini", "Melauli", "Purnagiri",
  "Darchula", "Mahakali", "Naugad",
  "Chainpur", "Bungal", "Jayaprithvi", "Masta",
  "Martadi", "Badimalika", "Budhiganga",
  "Mangalsen", "Kamalbazar", "Sanphebagar",
  "Dipayal Silgadhi", "Jorayal", "Shikhar",
];

// Remove duplicates, sort alphabetically
const NEPAL_LOCATIONS = [...new Set(nepalLocations)].sort((a, b) =>
  a.localeCompare(b)
);

export default NEPAL_LOCATIONS;
