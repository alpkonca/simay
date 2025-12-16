// ============================================
// MEMORY DATA - Edit this file to change texts!
// ============================================

const MEMORIES_DATA = {
    // Chapter titles
    chapters: {
        beginning: "Başlangıcımız",
        firsts: "İlklerimiz",
        adventures: "Tatillerimiz",
        disasters: "Trajikomik Anlarımız",
        insiders: "Inside Jokelarımız"
    },

    // All memories in order
    memories: [
        // ========== BAŞLANGIÇ ==========
        {
            id: 1,
            chapter: "beginning",
            photo: "01-scuba.jpg",
            tag: "Arkadaşlık Dönemi",
            title: "İlk Fotoğrafımız",
            description: "Scuba diving kulübünden... O zamanlar bunun \"ilk fotoğrafımız\" olacağını nereden bilebilirdik? 🤿",
            style: ""
        },
        {
            id: 2,
            chapter: "beginning",
            photo: "02-first-couple-photo.jpeg",
            tag: "Yeni Başlangıç",
            title: "İlk Fotoğrafımız (Çift Olarak)",
            description: "Artık \"biz\" olmuştuk. Bu fotoğraf bunun kanıtı. 📸",
            style: ""
        },
        {
            id: 3,
            chapter: "beginning",
            video: "03-bar.mp4",
            tag: "İlk Kıvılcım ✨",
            title: "Her Şeyin Başladığı Yer",
            description: "O bar... İlk kıvılcımın çaktığı, bir şeylerin farklı hissettirmeye başladığı an.",
            style: ""
        },
        {
            id: 4,
            chapter: "beginning",
            video: "03-bar.mp4",
            tag: "İlk Öpücük 💋",
            title: "Amsterdam Havalimanı",
            description: "Havalimanında, kalabalığın ortasında... O an her şey durdu.",
            style: ""
        },
        {
            id: 5,
            chapter: "beginning",
            photo: "05-fiesta-macumba.jpg",
            tag: "İlk Buluşma 💃",
            title: "Fiesta Macumba",
            description: "Amsterdam'da ilk resmi buluşmamız. Dans, müzik ve seninle geçen ilk gece...",
            style: ""
        },

        // ========== İLKLERİMİZ ==========
        {
            id: 6,
            chapter: "firsts",
            photo: "06-christmas-tree.jpg",
            tag: "Barışma Hediyesi 🎄",
            title: "Noel Ağacı",
            description: "İlk yanlışımdan sonra seni mutlu etmek için aldığım ağaç... (İlk yanlışım, ama son değil 😅)",
            style: ""
        },
        {
            id: 7,
            chapter: "firsts",
            photo: "07-earring.jpg",
            tag: "İlk Gerçek Hediye 🎁",
            title: "Küpe",
            description: "Sana verdiğim ilk gerçek hediye. Umarım hala takıyorsundur... (takıyorsun değil mi? 👀)",
            style: ""
        },
        {
            id: 8,
            chapter: "firsts",
            photo: "08-new-year.jpg",
            tag: "İlk Yılbaşı 🎆",
            title: "Yeni Yıl Birlikte",
            description: "İlk kez birlikte karşıladığımız yılbaşı. Yeni yıl, yeni umutlar, seninle...",
            style: ""
        },
        {
            id: 9,
            chapter: "firsts",
            photo: "09-kings-day.jpg",
            tag: "İlk Kral Günü 🧡",
            title: "Koningsdag",
            description: "Turuncu kıyafetler, sokak partileri ve sen. Hollanda'nın en turuncu günü!",
            style: ""
        },
        {
            id: 10,
            chapter: "firsts",
            photo: "10-boat.jpg",
            tag: "İlk Tekne Turu 🚤",
            title: "Kanalda Gezinti",
            description: "Seninle suyun üzerinde süzülmek... Her şey çok huzurluydu.",
            style: ""
        },
        {
            id: 11,
            chapter: "firsts",
            photo: "11-squash.jpg",
            tag: "İlk Squash Maçı 🎾",
            title: "Rekabet Başlasın!",
            description: "Kim kazandı hatırlamıyorum ama muhtemelen ben... (tamam belki sen 😏)",
            style: ""
        },
        {
            id: 12,
            chapter: "firsts",
            photo: "12-gym.jpg",
            tag: "İlk Spor Salonu 💪",
            title: "Birlikte Ter Dökmek",
            description: "Fitness çifti olmaya çalışıyoruz... Ne kadar başarılı olduğumuz tartışılır 😂",
            style: ""
        },
        {
            id: 13,
            chapter: "firsts",
            photo: "13-ice-skating.jpg",
            tag: "İlk Buz Pateni ⛸️",
            title: "Kayarak, Düşerek...",
            description: "Kaç kere düştük? Önemli değil, birbirimizi tuttuk. ❄️",
            style: ""
        },
        {
            id: 14,
            chapter: "firsts",
            photo: "14-photo-booth.jpg",
            tag: "Klasik Anı 📷",
            title: "İlk Fotoğraf Kabini",
            description: "Her çiftin yapması gereken şey: fotoğraf kabininde çılgın pozlar! 🤪",
            style: ""
        },

        // ========== MACERALAR ==========
        {
            id: 15,
            chapter: "adventures",
            photo: "15-alacati.jpg",
            tag: "İlk Sadece Biz Tatili ✈️",
            title: "Alaçatı",
            description: "Sadece ikimiz, Ege'nin mavisi, taş sokaklar ve sonsuz mutluluk...",
            style: "featured"
        },
        {
            id: 16,
            chapter: "adventures",
            photo: "16-alacati-dinner.jpg",
            tag: "Mükemmel Akşam Yemeği 🍽️",
            title: "O Restoran",
            description: "Alaçatı'daki o inanılmaz yemek... Her lokmada mutluluk, her yudumda aşk.",
            style: ""
        },
        {
            id: 17,
            chapter: "adventures",
            photo: "17-fethiye-cowboy.jpg",
            tag: "Kovboy Zamanı 🤠",
            title: "Fethiye Kovboyları",
            description: "Kovboy şapkalarıyla poz verdik! Yeehaw! 🤠",
            style: ""
        },

        // ========== FELAKETLER & KOMİK ANLAR ==========
        {
            id: 18,
            chapter: "disasters",
            photo: "18-train-disaster.jpg",
            tag: "Felaket Yolculuğu 🚂",
            title: "6 Saat Mahsur",
            description: "Barcelona-Madrid arası... Biri sebepsiz yere acil frene bastı. 6 SAAT! Ama seninle berbat anlar bile güzel. 😅",
            style: "disaster"
        },
        {
            id: 19,
            chapter: "disasters",
            photo: "19-van-gogh.jpg",
            tag: "Ortak Nefret 🎨",
            title: "Van Gogh Müzesi",
            description: "İkimiz de beğenmedik. Sonunda bunda hemfikiriz! En azından birlikte sıkıldık. 🖼️",
            style: ""
        },
        {
            id: 20,
            chapter: "disasters",
            photo: "20-cleaning.jpg",
            tag: "Ölümcül Temizlik 🧹",
            title: "Eski Daire",
            description: "Eski daireyi temizlerken ikimiz de öldük... Ama birlikte öldük, önemli olan bu! 💀",
            style: ""
        },
        {
            id: 21,
            chapter: "disasters",
            photo: "21-olden.jpg",
            tag: "Doğum Günü Faciası 🎂",
            title: "Olden Restaurant",
            description: "Benim doğum günüm, en kötü servis, aç kalıp koca bir fatura ödedik. Bir daha ASLA! 😤",
            style: "disaster"
        },
        {
            id: 22,
            chapter: "disasters",
            photo: "22-car-hit.jpg",
            tag: "Video Anı 🎬",
            title: "Arabama Çarptılar",
            description: "Ben üzgün, sen mutlu... Nasıl bu kadar mutlu olabiliyorsun?! 😠😂 (Videon hala elimde)",
            style: ""
        },
        {
            id: 23,
            chapter: "disasters",
            photo: "23-slip.jpg",
            tag: "Efsanevi Düşüş 🎬",
            title: "O Atlayış",
            description: "Zıpladım, kaydım, düştüm... Ve sen gülmekten öldün. Video evidence mevcut! 😭",
            style: ""
        },
        {
            id: 24,
            chapter: "disasters",
            photo: "24-foot.jpg",
            tag: "Acı Dolu An 🩹",
            title: "Ayağımdaki Tahta",
            description: "Ayağıma batan o tahta parçası... Sen hemşire oldun. Teşekkürler Dr. Simay! 🏥",
            style: ""
        },
        {
            id: 25,
            chapter: "disasters",
            photo: "25-chocolate.jpg",
            tag: "Sinterklaas Yalanı 🍫",
            title: "S Şeklinde Çikolata",
            description: "\"Şans eseri S harfli geldi\" dedim... Aslında özellikle seçtim. Sürpriz! 😇🎅",
            style: ""
        },

        // ========== SADECE BİZİM ANLADIKLARIMIZ ==========
        {
            id: 26,
            chapter: "insiders",
            photo: "26-mcdonalds.jpg",
            tag: "İçeriden 🍔",
            title: "McDonald's",
            description: "Sen bilirsin...",
            style: "insider"
        },
        {
            id: 27,
            chapter: "insiders",
            photo: "27-red-string.jpg",
            tag: "İçeriden 🧵",
            title: "Red String Theory",
            description: "Kırmızı ip bizi bağladı...",
            style: "insider"
        },
        {
            id: 28,
            chapter: "insiders",
            photo: "28-surprise-egg.jpg",
            tag: "İçeriden 🥚",
            title: "Sürpriz Yumurta",
            description: "Yumuşacık oyuncaklar! İçinden ne çıkacak heyecanı... 🧸",
            style: "insider"
        },
        {
            id: 29,
            chapter: "insiders",
            photo: "29-car.jpg",
            tag: "İçeriden 🚗",
            title: "Benim Arabam",
            description: "\"Onu benden çok seviyorsun!\" - Sen, her fırsatta 😤",
            style: "insider"
        },
        {
            id: 30,
            chapter: "insiders",
            photo: "30-snoring.jpg",
            tag: "İçeriden 😴",
            title: "Horlaması",
            description: "Videon var, inkâr etme! 🎬 (Çok tatlısın aslında)",
            style: "insider"
        },
        {
            id: 31,
            chapter: "insiders",
            photo: "31-shirt.jpg",
            tag: "İçeriden 👕",
            title: "O Tişört",
            description: "Hediye ettim, hiç giymedin... Hâlâ bekliyorum! 💔",
            style: "insider"
        },
        {
            id: 32,
            chapter: "insiders",
            photo: "32-double-chin.jpg",
            tag: "İçeriden 🤳",
            title: "Çift Çene Fotoğrafı",
            description: "Silme, çok güzel! En sevdiğim fotoğraflarından biri 😂",
            style: "insider"
        }
    ],

    // Songs data - Add your songs here!
    songs: [
        {
            title: "Şarkı Adı",
            artist: "Sanatçı",
            memory: "Bu şarkıyı ilk kez nerede dinledik..."
        }
        // Add more songs like this:
        // { title: "Song Name", artist: "Artist", memory: "Memory about this song..." },
    ],

    // Final message
    finalMessage: {
        title: "1. Yılımız Kutlu Olsun",
        paragraph1: "Bu bir yılda seninle o kadar çok şey yaşadık ki... Her anı, her gülüşü, her kavgayı, her barışmayı, her macerası sevdim.",
        paragraph2: "Daha nice yıllara, seninle.",
        signature: "Seni Seviyorum 💝"
    }
};
