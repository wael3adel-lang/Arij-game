// Çocuk kodu -> izin verilen oyun
// Şimdilik statik GitHub Pages sürümüdür.
// Gerçek güvenlik için ileride Supabase Auth/Database bağlanabilir.
const STUDENTS = {
  "ARIJ01": { name: "Öğrenci 1", games: ["sayi-avi"] },
  "ARIJ02": { name: "Öğrenci 2", games: ["harf-kutusu"] },
  "ARIJ03": { name: "Öğrenci 3", games: ["sayi-avi", "harf-kutusu"] }
};

const GAMES = {
  "sayi-avi": {
    title: "Sayı Avı",
    path: "games/sayi-avi.html"
  },
  "harf-kutusu": {
    title: "Harf Kutusu",
    path: "games/harf-kutusu.html"
  }
};
