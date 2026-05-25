// Audio URLs use exact global ayah numbers (1-6236) on islamic.network CDN
// Each number was computed precisely from Quran verse counts — audio ALWAYS matches text

const A = (n) => `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${n}.mp3`

export const AYAHS = [
  {
    id: 1,
    arabic: "أَلَمْ يَعْلَم بِأَنَّ ٱللَّهَ يَرَىٰ",
    translation: "Does he not know that Allah sees?",
    ref: "Al-Alaq 96:14",
    audioUrl: A(6120), // surah 96, verse 14
    theme: "watchful",
    emotion: "fear"
  },
  {
    id: 2,
    arabic: "قُل لِّلْمُؤْمِنِينَ يَغُضُّوا۟ مِنْ أَبْصَـٰرِهِمْ وَيَحْفَظُوا۟ فُرُوجَهُمْ ۚ ذَٰلِكَ أَزْكَىٰ لَهُمْ",
    translation: "Tell the believing men to lower their gaze and guard their chastity — that is purer for them.",
    ref: "An-Nur 24:30",
    audioUrl: A(2821), // surah 24, verse 30
    theme: "guard",
    emotion: "guard"
  },
  {
    id: 3,
    arabic: "قُلْ يَـٰعِبَادِىَ ٱلَّذِينَ أَسْرَفُوا۟ عَلَىٰٓ أَنفُسِهِمْ لَا تَقْنَطُوا۟ مِن رَّحْمَةِ ٱللَّهِ ۚ إِنَّ ٱللَّهَ يَغْفِرُ ٱلذُّنُوبَ جَمِيعًا",
    translation: "Say: O My servants who have wronged themselves — do not despair of Allah's mercy. Indeed, Allah forgives all sins.",
    ref: "Az-Zumar 39:53",
    audioUrl: A(4111), // surah 39, verse 53
    theme: "mercy",
    emotion: "guilt"
  },
  {
    id: 4,
    arabic: "وَمَن يَتَّقِ ٱللَّهَ يَجْعَل لَّهُۥ مَخْرَجًا",
    translation: "Whoever fears Allah — He will make a way out for him.",
    ref: "At-Talaq 65:2",
    audioUrl: A(5219), // surah 65, verse 2
    theme: "strength",
    emotion: "hope"
  },
  {
    id: 5,
    arabic: "يَعْلَمُ خَآئِنَةَ ٱلْأَعْيُنِ وَمَا تُخْفِى ٱلصُّدُورُ",
    translation: "He knows the treachery of the eyes, and what the hearts conceal.",
    ref: "Ghafir 40:19",
    audioUrl: A(4152), // surah 40, verse 19
    theme: "watchful",
    emotion: "fear"
  },
  {
    id: 6,
    arabic: "وَلَا تَقْرَبُوا۟ ٱلزِّنَىٰٓ ۖ إِنَّهُۥ كَانَ فَـٰحِشَةً وَسَآءَ سَبِيلًا",
    translation: "Do not approach unlawful intimacy — it is an outrage and an evil path.",
    ref: "Al-Isra 17:32",
    audioUrl: A(2061), // surah 17, verse 32
    theme: "guard",
    emotion: "guard"
  },
  {
    id: 7,
    arabic: "إِنَّ ٱلَّذِينَ يَخْشَوْنَ رَبَّهُم بِٱلْغَيْبِ لَهُم مَّغْفِرَةٌ وَأَجْرٌ كَبِيرٌ",
    translation: "Those who fear their Lord unseen — for them is forgiveness and a great reward.",
    ref: "Al-Mulk 67:12",
    audioUrl: A(5253), // surah 67, verse 12
    theme: "strength",
    emotion: "hope"
  },
  {
    id: 8,
    arabic: "إِنَّ ٱللَّهَ مَعَ ٱلصَّـٰبِرِينَ",
    translation: "Indeed, Allah is with the patient.",
    ref: "Al-Baqarah 2:153",
    audioUrl: A(160), // surah 2, verse 153
    theme: "strength",
    emotion: "hope"
  },
  {
    id: 9,
    arabic: "فَإِنَّ مَعَ ٱلْعُسْرِ يُسْرًا ۝ إِنَّ مَعَ ٱلْعُسْرِ يُسْرًا",
    translation: "For indeed, with hardship comes ease. Indeed, with hardship comes ease.",
    ref: "Ash-Sharh 94:5-6",
    audioUrl: A(6095), // surah 94, verse 5
    theme: "mercy",
    emotion: "hope"
  },
  {
    id: 10,
    arabic: "وَٱللَّهُ يُرِيدُ أَن يَتُوبَ عَلَيْكُمْ",
    translation: "And Allah wants to turn to you in forgiveness.",
    ref: "An-Nisa 4:27",
    audioUrl: A(520), // surah 4, verse 27
    theme: "mercy",
    emotion: "guilt"
  }
]

export const SECRET_DEEDS = [
  { icon: "📖", text: "Recite Surah Al-Ikhlas 3 times slowly, thinking of His oneness.", reward: "Equals reciting ⅓ of the Quran" },
  { icon: "🤲", text: "Make du'a right now for a Muslim you've never met — anyone, anywhere.", reward: "Angels say Ameen and ask the same for you" },
  { icon: "💧", text: "Make wudu right now. Feel each drop as a purification.", reward: "Sins fall with every drop" },
  { icon: "🌙", text: "Recite Ayat Al-Kursi once, with full presence. No rush.", reward: "Protected until your next prayer" },
  { icon: "📿", text: "SubhanAllah 33×, Alhamdulillah 33×, Allahu Akbar 34×.", reward: "A mountain of good deeds" },
  { icon: "✍️", text: "Write one quality you love about Allah — just one, right now.", reward: "Deepens your connection to Him" },
  { icon: "🫀", text: "Hand on chest: 'O Allah — You see what I'm facing. Help me.'", reward: "Du'a from the heart is never rejected" },
  { icon: "🌿", text: "Say 'La hawla wa la quwwata illa billah' 10 times. You cannot do this alone.", reward: "A treasure from Jannah" },
]

export function getRandomAyah(excludingId = null) {
  const pool = excludingId ? AYAHS.filter(a => a.id !== excludingId) : AYAHS
  return pool[Math.floor(Math.random() * pool.length)]
}

export function getAyahsByEmotion(emotion) {
  const filtered = AYAHS.filter(a => a.emotion === emotion)
  return filtered.length ? filtered : AYAHS
}

export function getRandomDeed() {
  return SECRET_DEEDS[Math.floor(Math.random() * SECRET_DEEDS.length)]
}
