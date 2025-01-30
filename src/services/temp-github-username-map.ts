const tempGithubUsernameMap: Record<string, string> = {
  "42": "shrimpnaur",
  "43": "The-Yearly",
  "2": "ItsAbhinavM",
  "44": "ganidande905",
  "4": "KKSurendran06",
  "6": "ashwinpraveengo",
  "8": "Iruos8805",
  "45": "CrownDestro",
  "7": "amansxcalibur",
  "34": "Anamika457",
  "1": "hrideshmg",
  "10": "swayam-agrahari",

  "12": "RihaanBH-1810",
  "13": "AtharvaNair04",
  "15": "Wreck-X",
  "17": "QuantuM410",
  "18": "satvshr",
  "19": "BiscuitBobby",
  "20": "2205u",
  "21": "fuzzew",
  "22": "KshitijThareja",
  "23": "chimnayajith",
  "24": "akshaya9999",
  "25": "Pakhi07",
  "26": "he1senbrg",
  "27": "Mukund-Menon",
  "28": "JATAYU000",
  "29": "Drone944",
  "30": "cr3ativ3cod3r",
  "35": "shraavv",
  "36": "addynair",
  "37": "kirtisikka1211",
  "38": "Viserion-7",
  "39": "spellsharp",
  "40": "verz0",
  "41": "TheHuntsman4",
  "11": "navaneeth0041",
  "14": "sabarixr",
  "16": "Aaryanajith",
  "9": "angrezichatterbox",
  "3": "hkx05",
  "5": "Vishnu-M-E",
};
export function getGithubUsername(id: number) {
  return tempGithubUsernameMap[id.toString()] ?? "";
}
