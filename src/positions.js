// ==================================================
// BIBLIOTHÈQUE DE POSITIONS — TdB
// ==================================================
//
// Ce fichier est le seul à modifier pour alimenter le menu « bibliothèque »
// (bouton en forme de dossier, au-dessus du champ FEN).
//
// Chaque position est un objet :
//
//    path  = chemin dans le menu, du plus général au plus précis.
//            Le premier élément doit être l'une des 7 catégories ci-dessous ;
//            les suivants (autant que vous voulez) sont des sous-catégories
//            créées automatiquement la première fois qu'elles apparaissent.
//
//            Dans un nom (de sous-catégorie ou de position), tout groupe de lettres
//            placé entre accolades est remplacé par des figurines :
//               lettres françaises : R Roi, D Dame, T Tour, F Fou, C Cavalier, P Pion
//               MAJUSCULE = figurine blanche, minuscule = figurine noire
//
//               '{P}-Tour en 7ème'      →  [Pion blanc]-Tour en 7ème
//               '{p}-Tour en 7ème'      →  [Pion noir]-Tour en 7ème
//               '{RTP} vs {rt}'         →  Roi, Tour, Pion blancs  vs  Roi, Tour noirs
//               '{P}-{t} en 7ème'       →  [Pion blanc]-[Tour noire] en 7ème
//
//            Raccourci : 'fig: RTP vs RT' équivaut à '{RTP} vs {rt}'.
//
//    title = nom affiché dans le menu (et dans l'en-tête [Event] du PGN)
//
//    fen   = position de départ. Le trait est celui indiqué par le FEN : la
//            partie démarre aussitôt avec le bouton Trait correspondant
//            sélectionné (cliquer dessus ramène à l'édition, l'autre bouton
//            change le trait).
//
//    note  = (facultatif) texte d'info affiché au survol dans le menu
//
// Exemple :
//
//    {
//        path: ['Finales de Tours', 'fig: RTP vs RT', 'Pion-Tour', 'Pion en 7ème rangée'],
//        title: 'Position de Lucena',
//        fen: '1K1k4/1P6/8/8/8/8/r7/2R5 w - - 0 1'
//    },
//
// Dans chaque menu, les sous-catégories et les positions apparaissent dans
// l'ordre où elles sont écrites ci-dessous : il suffit donc de déplacer un
// bloc pour changer son rang. Un chemin ou un FEN invalide est signalé dans
// la console du navigateur (F12) et la position est ignorée.
// ==================================================

// Les catégories (et leur ordre d'affichage)
export const categories = [
    'TdB Chronologique',
    'TdB Thématique'
];

export const positions = [

    // ---------- TdB chronologique ----------
    
    // ---------- 2024-2025 ----------
    // ---------- TdB1 ----------

    {
        path: ['TdB Chronologique', 'TdB1', 'Mat du Couloir'],
        title: 'TdB1-1 : Fuster - Balogh (Budapest, 1945)',
        fen: '5rk1/5ppp/8/8/8/4PQ2/r1q2PPP/RR4K1 b - - 0 1',
        url: 'https://lichess.org/study/KODwkcmn/wtBVuyy5',
        marks: 'arrow:vert:c2>b2'
    },

    {
        path: ['TdB Chronologique', 'TdB1', 'Mat du Couloir'],
        title: 'TdB1-2 : Rovner - Kamishov (Moscou, 1947)',
        fen: '1r1r2k1/2q2ppp/p3b3/4p3/1p2P3/5B2/PPPR1QPP/3R3K w - - 0 1',
        url: 'https://lichess.org/study/KODwkcmn/37ww0B5X',
        marks: 'arrow:vert:f2>a7'
    },

    {
        path: ['TdB Chronologique', 'TdB1', 'Mat du Couloir'],
        title: 'TdB1-3 : Teschner - Portisch (Monte Carlo, 1969)',
        fen: 'k1r1r3/pp5p/1q6/3R1Np1/1b6/1P3P2/2Q1R1PP/7K b - - 0 1',
        url: 'https://lichess.org/study/KODwkcmn/JbRkXQlQ',
        marks: 'arrow:vert:b6>f2'
    },

    {
        path: ['TdB Chronologique', 'TdB1', 'Finales {R}{D} vs {r}{d} - Le Rectangle 4x3'],
        title: 'TdB1-4 : J. de la Villa (Los 100 Finales que hay que saber, 2008)',
        fen: '8/6P1/8/8/5K2/8/6k1/7q w - - 0 1',
        url: 'https://lichess.org/study/KODwkcmn/PiG2BARS',
        marks: 'border:vert:g4,h4,h3,h2,h1,g1,g2,g3,f4,f3,f2,f1 piece=Qw:bleu:a2 arrow:bleu:a2>g2 piece=Kb:rouge:g2 piece=Kw:bleu:f4 piece=Qb:rouge:h1'
    },

    {
        path: ['TdB Chronologique', 'TdB1', 'Finales {R}{D} vs {r}{d} - Le Rectangle 4x3'],
        title: 'TdB1-5 : Anand - Thipsay (Coimbatore, 1987)',
        fen: '2Q5/8/8/8/8/3K4/1k6/q7 w - - 0 1',
        url: 'https://lichess.org/study/KODwkcmn/rSkHGCBI',
        marks: 'border:vert:a3,b3,c3,d3,d2,d1,c1,b1,a1,a2,b2,c2 piece=Qw:bleu:b8 piece=Kw:bleu:d3 piece=Kw:rouge:b2 piece=Qb:rouge:a1 arrow:bleu:b8>b2'
    },

    {
        path: ['TdB Chronologique', 'TdB1', 'Etude - L\'Escalier de Mouterde'],
        title: 'TdB1-6 : A. Mouterde (La Stratégie, 1922)',
        fen: '3kr2q/6Q1/8/8/8/4R3/8/K7 w - - 0 1',
        url: 'https://lichess.org/study/KODwkcmn/bc7SQG59',
        marks: 'arrow:rouge:h8>a1 piece=Rw:bleu:c3 piece=Qw:bleu:b2'
    },

    // ---------- TdB2 ----------

    {
        path: ['TdB Chronologique', 'TdB2', 'Mat de Boden'],
        title: 'TdB2-1 : Ed. Lasker - Englund (Scheveningue 1913)',
        fen: '2kr1b1r/pp3ppp/2p1b2q/4B3/4Q3/2PB2R1/PPP2PPP/3R2K1 w - - 0 1',
        url: 'https://lichess.org/study/jtsBgg9o/5nz9Jtqn',
        marks: 'arrow:vert:e4>c6 arrow:rouge:d3>a6'
    },

    {
        path: ['TdB Chronologique', 'TdB2', 'Mat de Boden'],
        title: 'TdB2-2 : Morphy - Thompson (New York, 1859)',
        fen: 'r2k1r2/pp1b2pp/1b2Pn2/2p5/Q1B2Bq1/2P5/P5PP/3R1RK1 w - - 0 1',
        url: 'https://lichess.org/study/jtsBgg9o/iXk8AJny',
        marks: 'arrow:vert:d1>d7 arrow:bleu:a4>c6 arrow:rouge:c4>a6'
    },

    {
        path: ['TdB Chronologique', 'TdB2', 'Mat de Boden'],
        title: 'TdB2-3 : Schulder - Boden (Londres, 1860)',
        fen: '2k1rb1r/ppp3pp/2np1q2/5b2/2B2P2/2P1BQ2/PP1N1P1P/2KR3R b - - 0 1',
        url: 'https://lichess.org/study/jtsBgg9o/SURLwAiF',
        marks: 'arrow:bleu:f6>c3 arrow:rouge:f8>a3 arrow:vert:d6>d5'
    },

    {
        path: ['TdB Chronologique', 'TdB2', 'Finales {R}{C} vs {r}{p} - {p}-Tour'],
        title: 'TdB2-4 : J. de La Villa (Los 100 Finales que hay que saber, 2008)',
        fen: '7K/8/8/8/7N/7p/7k/8 w - - 0 1',
        url: 'https://lichess.org/study/jtsBgg9o/2q4BBMH0',
        marks: 'circle:bleu:h2,g4,e3,f1'
    },

    {
        path: ['TdB Chronologique', 'TdB2', 'Finales {R}{C} vs {r}{p} - {p}-Tour'],
        title: 'TdB2-5 : J. Levitt (1997)',
        fen: '7K/8/8/8/7N/7p/8/7k w - - 0 1',
        url: 'https://lichess.org/study/jtsBgg9o/qNwXThkA',
        marks: 'circle:vert:h2,g4,e3,f1'
    },

    {
        path: ['TdB Chronologique', 'TdB2', 'Etude - L\'Echelle de Saavedra'],
        title: 'TdB2-6 : F. Saavedra / G.E. Barbier (Glasgow Weekly Citizen, 1895)',
        fen: '8/8/1KP5/3r4/8/8/8/k7 w - - 0 1',
        url: 'https://lichess.org/study/jtsBgg9o/rnfGaUJn',
        marks: 'arrow:vert:c6>c8 piece=Rw:vert:c8'
    },

    // ---------- TdB3 ----------

    {
        path: ['TdB Chronologique', 'TdB3', 'Mat d\'Anastasia'],
        title: 'TdB3-1 : Bayer - Falkbeer (Vienne, 1852)',
        fen: 'Q7/p1p1k1pp/1b6/7q/3n1r2/8/P4PPP/RN3RK1 b - - 0 1',
        url: 'https://lichess.org/study/uMLLix2a/SiI0vvuq',
        marks: 'arrow:vert:d4>e2 arrow:bleu:h5>h2'
    },

    {
        path: ['TdB Chronologique', 'TdB3', 'Mat d\'Anastasia'],
        title: 'TdB3-2 : Kamyshov - Sokolski (Leningrad, 1936)',
        fen: '6k1/p4p1p/3p1p2/2p1r3/2PnrqN1/P6P/1P1Q1PP1/3R1RK1 b - - 0 1',
        url: 'https://lichess.org/study/uMLLix2a/yrosHTOM',
        marks: 'arrow:bleu:f4>g4 arrow:vert:d4>e2'
    },

    {
        path: ['TdB Chronologique', 'TdB3', 'Mat d\'Anastasia'],
        title: 'TdB3-3 : Vidmar - Euwe (Karlsbad, 1929)',
        fen: '6k1/5pb1/1p1N3p/p5p1/5q2/Q6P/PPr5/3RR1K1 w - - 0 1',
        url: 'https://lichess.org/study/uMLLix2a/rJ6OeYwu',
        marks: 'arrow:vert:e1>e8'
    },

    {
        path: ['TdB Chronologique', 'TdB3', 'Finales {R}{P} vs {r} - Cases Clés d\'un {P} passé'],
        title: 'TdB3-4 : J. Drtina (Casopis Ceskych Sachistu, 1908)',
        fen: '5k2/8/8/8/8/2P5/8/3K4 w - - 0 1',
        url: 'https://lichess.org/study/uMLLix2a/2YIcxk9x',
        marks: 'border:vert:b8,b7,b6,b5,c5,d5,d6,d7,d8,c8,c7,c6 disc:vert:b5,c5,d5 text=1:bleu:c4 text=1:rouge:c6 label=2a:bleu:b4 label=2a:rouge:b6 label=2b:rouge:d6 label=2b:bleu:d4 disc:vert:e5,f5,g5,h5,a5 text=3:cyan:a4 text=3:rose:a6 text=4:rose:e6 text=5:rose:f6 text=6:rose:g6 text=7:rose:h6 text=7:cyan:h4 text=6:cyan:g4 text=5:cyan:f4 text=4:cyan:e4'
    },

    {
        path: ['TdB Chronologique', 'TdB3', 'Finales {R}{P} vs {r} - Cases Clés d\'un {P} passé'],
        title: 'TdB3-5 : d\'après Drtina',
        fen: '4k3/8/8/8/8/2P5/8/3K4 w - - 0 1',
        url: 'https://lichess.org/study/uMLLix2a/h1sIWnZw',
        marks: 'border:vert:b8,b7,b6,b5,c5,d5,d6,d7,d8,c8,c7,c6 disc:vert:b5,c5,d5 text=1:bleu:c4 text=1:rouge:c6 label=2a:bleu:b4 label=2a:rouge:b6 label=2b:rouge:d6 label=2b:bleu:d4 disc:vert:e5,f5,g5,h5,a5 text=3:cyan:a4 text=3:rose:a6 text=4:rose:e6 text=5:rose:f6 text=6:rose:g6 text=7:rose:h6 text=7:cyan:h4 text=6:cyan:g4 text=5:cyan:f4 text=4:cyan:e4'
    },

    {
        path: ['TdB Chronologique', 'TdB3', 'Etude - Le Carré de Lasker'],
        title: 'TdB3-6 : Em. Lasker (Deutches Wochenschach und Berliner Schachzeitung, 1890)',
        fen: '2K5/2P4R/k7/8/8/8/2r4p/8 w - - 0 1',
        url: 'https://lichess.org/study/uMLLix2a/Pov1DVKh',
        marks: 'arrow:vert:h7>h6,h6>h5,h5>h4,h4>h3,h3>h2'
    },


    // ---------- TdB4 ----------

    {
        path: ['TdB Chronologique', 'TdB4', 'Mat Arabe'],
        title: 'TdB4-1 : Andriasian - Burg (Groningue, 2021)',
        fen: 'r4nk1/pp2r1p1/2p1P2p/3p1P1N/8/8/PPPK4/6RR w - - 0 1',
        url: 'https://lichess.org/study/VdTzW3uu/71tLoVpO',
        marks: 'arrow:bleu:h1>h6 arrow:rouge:g1>g8 arrow:vert:h5>f6'
    },

    {
        path: ['TdB Chronologique', 'TdB4', 'Mat Arabe'],
        title: 'TdB4-2 : Anderssen - Schallopp (Berlin, 1864)',
        fen: '6k1/3R2pp/8/6r1/3n1p2/1P3P1K/P1r3P1/4R3 b - - 0 1',
        url: 'https://lichess.org/study/VdTzW3uu/cLVTqiCw',
        marks: 'arrow:vert:g5>g3 arrow:bleu:d4>f3',
        marks: 'arrow:vert:g5>g3 arrow:bleu:d4>f3'
    },

    {
        path: ['TdB Chronologique', 'TdB4', 'Mat Arabe'],
        title: 'TdB4-3 : Gelfand - Kramnik (Berlin, 1996)',
        fen: '1r4k1/p5pp/4q3/2Q2pP1/3N4/Prn1P3/1P1B1P1P/KR6 b - - 0 1',
        url: 'https://lichess.org/study/VdTzW3uu/k56pN4cw',
        marks: 'arrow:vert:b3>b2'
    },

    {
       path: ['TdB Chronologique', 'TdB4', 'Finales {RD} vs {rp}'],
        title: 'TdB4-4 : I.A. Horowitz (How to Win in the Chess Endings, 1957)',
        fen: '8/5K1Q/8/8/8/2p5/8/k7 w - - 0 1',
        url: 'https://lichess.org/study/VdTzW3uu/17NA4Olt',
        marks: 'arrow:vert:h7>g7,g7>d4'
    },

    {
        path: ['TdB Chronologique', 'TdB4', 'Finales {RD} vs {rp}'],
        title: 'TdB4-5 : I.A. Horowitz (How to Win in the Chess Endings, 1957)',
        fen: '8/6KQ/8/8/8/2p5/8/k7 w - - 0 1',
        url: 'https://lichess.org/study/VdTzW3uu/HUFpWxed',
        marks: 'arrow:vert:h7>h6,h6>f6'
    },

    {
        path: ['TdB Chronologique', 'TdB4', 'Etude - L\'Aller-Retour de Sarychev'],
        title: 'TdB4-6 : A. & K. Sarychev (Shakhmatny Listok, 1928)',
        fen: '8/1pPK3b/8/8/8/5k2/8/8 w - - 0 1',
        url: 'https://lichess.org/study/VdTzW3uu/ouwApKAx',
        marks: 'arrow2:vert:d7>c8'
    },


    // ---------- TdB5 ----------

    {
        path: ['TdB Chronologique', 'TdB5', 'Mat Lucena'],
        title: 'TdB5-1 : Almeida - Feijoeiro (Lisbonne, 1993)',
        fen: 'r1b1r3/pp1nBkbp/1qpQ2p1/8/4PPn1/2N2N2/PPP3PP/R4R1K w - - 0 1',
        url: 'https://lichess.org/study/RTIUJ9IG/D5nSMvcx',
        marks: 'arrow:vert:f3>g5 arrow:bleu:d6>e6 arrow:rouge:g5>f7'
    },

    {
        path: ['TdB Chronologique', 'TdB5', 'Mat Lucena'],
        title: 'TdB5-2 : Beier - Breithut (Schney, 1993)',
        fen: 'r3r1k1/1b2ppbp/p4np1/1pq5/5B2/1BP2N1P/PP2QPP1/3R1RK1 w - - 0 1',
        url: 'https://lichess.org/study/RTIUJ9IG/jMKwqojY',
        marks: 'arrow:vert:b3>f7 arrow:bleu:f3>g5 arrow:rouge:e2>e6'
    },

    {
        path: ['TdB Chronologique', 'TdB5', 'Mat Lucena'],
        title: 'TdB5-3 : Zatulovskaïa - Skegina (Sotchi, 1982)',
        fen: '2rr2k1/p5bp/1pn1R3/2pp1pN1/5P2/1Pq3P1/P2Q1B1P/3R1K2 w - - 0 1',
        url: 'https://lichess.org/study/RTIUJ9IG/ULHG9a0s',
        marks: 'arrow:vert:e6>e8 arrow:bleu:d2>d5 arrow:rouge:g5>f7'
    },

    {
       path: ['TdB Chronologique', 'TdB5', 'Finales {RP} vs {rp} - {P}/{p} bloqués - Le Trébuchet'],
        title: 'TdB5-4 : P.A. Durand (La Régence, 1860)',
        fen: '8/8/1k1p4/3P1K2/8/8/8/8 w - - 0 1',
        url: 'https://lichess.org/study/RTIUJ9IG/GabMVrOq',
        marks: 'border:vert:d6,e6,f6,g6,g7,g8,f7,f8,e8,e7,d7,d8,c6,b6,a6,a7,a8,b8,c8,c7,b7 border:bleu:e6 border:rouge:c5 label=ZZ:rouge:c5 label=ZZ:bleu:e6 arrow:vert:f5>f6'
    },

    {
        path: ['TdB Chronologique', 'TdB5', 'Finales {RP} vs {rp} - {P}/{p} bloqués - Le Trébuchet'],
        title: 'TdB5-5 : P.A. Durand (La Régence, 1860)',
        fen: '8/8/8/1k1p4/3P1K2/8/8/8 w - - 0 1',
        url: 'https://lichess.org/study/RTIUJ9IG/DlvmEGhk',
        marks: 'border:vert:g5,g6,g7,f7,e7,d7,c7,b7,a7,a6,a5,b5,c5,b6,c6,d6,e6,f6,d5,e5,f5 border:bleu:e5 box:rouge:c4 label=ZZ:rouge:c4 label=ZZ:bleu:e5'
    },

    {
        path: ['TdB Chronologique', 'TdB5', 'Etude - Le Triangle de Joseph'],
        title: 'TdB5-6 : D. Joseph (British Chess Magazine, 1922)',
        fen: '3K4/kp6/p7/1P6/8/8/7P/8 w - - 0 1',
        url: 'https://lichess.org/study/RTIUJ9IG/ALRn0M33',
        marks: 'arrow:vert:b5>b6 piece=Qb:rouge:a1 arrow:bleu:h8>g8,g8>e8,e8>e5,e5>h8 piece=Qw:bleu:h8'
    },



    // ---------- TdB6 ----------

    {
        path: ['TdB Chronologique', 'TdB6', 'Mat de l\'Opéra'],
        title: 'TdB6-1 : van Vliet - Passmore (Londres, 1900)',
        fen: '4r1k1/p3bp1p/1p4p1/3q1p2/8/1P2PR1Q/PBr3PP/R5K1 w Q - 0 1',
        url: 'https://lichess.org/study/pPDqTYSi/bh2xEaDC',
        marks: 'arrow:vert:b5>b6 piece=Qb:rouge:a1 arrow:bleu:h8>g8,g8>e8,e8>e5,e5>h8 piece=Qw:bleu:h8'
    },

    {
        path: ['TdB Chronologique', 'TdB6', 'Mat de l\'Opéra'],
        title: 'TdB6-2 : Muellneritsch - Eichert (Raika, 1999)',
        fen: 'r5kr/p1q2p2/bpn1p1p1/3pP1BQ/3P4/b1PB1R2/P4PPP/R5K1 w Q - 0 1',
        url: 'https://lichess.org/study/pPDqTYSi/UbmCRBz1',
        marks: 'arrow:vert:h5>h8 arrow:bleu:f3>h3 arrow:jaune:g5>f6'
    },

    {
        path: ['TdB Chronologique', 'TdB6', 'Mat de l\'Opéra'],
        title: 'TdB6-3 : Belenky - Pirogov (Moscou, 1975)',
        fen: '3rr1k1/1bp2ppp/p7/1p1q4/3P1B2/2P3P1/PP5K/RN1Q2R1 b - - 0 1',
        url: 'https://lichess.org/study/pPDqTYSi/JSY54Jzn',
        marks: 'arrow:rouge:d5>g2,d5>h5 arrow:vert:e8>e1 arrow:rouge:e1>g1'
    },

    {
       path: ['TdB Chronologique', 'TdB6', 'Finales {RT} vs {rp} - La Coupure en 5e'],
        title: 'TdB6-4 : M. Dvoretsky (Manuel des Finales, 2004)',
        fen: '7K/6R1/1k6/p7/8/8/8/8 w - - 0 1',
        url: 'https://lichess.org/study/pPDqTYSi/dOZSowRH',
        marks: 'arrow:vert:g7>g5 cross:vert:b5,c5,d5,e5,f5,g5,h5'
    },

    {
        path: ['TdB Chronologique', 'TdB6', 'Finales {RT} vs {rp} - La Coupure en 5e'],
        title: 'TdB6-5 : J. de la Villa (Los 100 Finales que hay que saber, 2008)',
        fen: '6KR/8/pk6/8/8/8/8/8 b - - 0 1',
        url: 'https://lichess.org/study/pPDqTYSi/CV7viWrP',
        marks: 'arrow:gris:h8>h5 arrow:vert:b6>c5 disc:gris:a5,b5,c5,d5,e5,f5,g5,h5'
    },

    {
        path: ['TdB Chronologique', 'TdB6', 'Etude - La Prison de Polerio'],
        title: 'TdB6-6 : G.C. Polerio (L\’elegantia, sottilità, verità ..., ~1595)',
        fen: '8/8/6p1/7p/7P/8/pk1K4/2R5 w - - 0 1',
        url: 'https://lichess.org/study/pPDqTYSi/NrqcKHm4',
        marks: 'arrow:vert:c1>a1 arrow:bleu:d2>c2'
    },



    // ---------- TdB7 ----------

    {
        path: ['TdB Chronologique', 'TdB7', 'Mat des Epaulettes'],
        title: 'TdB7-1 : van Wely - Morozevich (Wijk aan Zee, 2001)',
        fen: '1k1r4/pp1q1B1p/3bQp2/2p2r2/P6P/2BnP3/1P6/5RKR b - - 25 1',
        url: 'https://lichess.org/study/j6Q6uKTU/nMcJLSgg'
    },

    {
        path: ['TdB Chronologique', 'TdB7', 'Mat des Epaulettes'],
        title: 'TdB7-2 : Safarli - Rodshtein (Ile de Man, 2019)',
        fen: '5rkr/pp3p1p/2nq2pQ/3p1RN1/3P4/2P5/PP4PP/4R1K1 w - - 1 1',
        url: 'https://lichess.org/study/j6Q6uKTU/bBmqpw1z'
    },

    {
        path: ['TdB Chronologique', 'TdB7', 'Mat des Epaulettes'],
        title: 'TdB7-3 : Steinitz - NN (1861)',
        fen: 'r1q3kr/1p4p1/p1p2R1p/5p2/6PP/P3Q3/1P4P1/3R3K w - - 1 1',
        url: 'https://lichess.org/study/j6Q6uKTU/FoAKWAQu'
    },

    {
       path: ['TdB Chronologique', 'TdB7', 'Finales {RFP} vs {rf} - {F}/{f} de même couleur - La Règle de Centurini/Averbakh'],
        title: 'TdB7-4 : Y. Averbakh (Comprehensive Chess Endings, 2012)',
        fen: '8/1K6/2P5/1k4B1/8/6b1/8/8 w - - 12 1',
        url: 'https://lichess.org/study/j6Q6uKTU/0slMczrp'
    },

    {
        path: ['TdB Chronologique', 'TdB7', 'Finales {RFP} vs {rf} - {F}/{f} de même couleur - La Règle de Centurini/Averbakh'],
        title: 'TdB7-5 : J. de la Villa (Los 100 Finales que hay que saber, 2008)',
        fen: '8/K7/1P6/k4B2/8/5b2/8/8 w - - 12 1',
        url: 'https://lichess.org/study/j6Q6uKTU/hCoQnzKJ'
    },

    {
        path: ['TdB Chronologique', 'TdB7', 'Etude - Le Carrousel de Centurini'],
        title: 'TdB7-6 : L. Centurini (La Régence, 1856)',
        fen: '2KB4/1P6/2k5/8/8/8/7b/8 w - - 12 1',
        url: 'https://lichess.org/study/j6Q6uKTU/KdoyUr3T'
    },



    // ---------- TdB8 ----------

    {
        path: ['TdB Chronologique', 'TdB8', 'Mat du Guéridon'],
        title: 'TdB8-1 : Tallantare - Ladelell (Newcastle, 1893)',
        fen: '5r1r/p3P1kp/1p4pq/4p3/2B5/8/P4QPP/6K1 w - - 0 1',
        url: 'https://lichess.org/study/Iofs72fq/xEl9C7dl'
    },

    {
        path: ['TdB Chronologique', 'TdB8', 'Mat du Guéridon'],
        title: 'TdB8-2 : von Holzhausen - Tarrasch (Francfort, 1912)',
        fen: 'r1bqr1k1/pppnbppp/2np4/8/2BNP3/2N4P/PPP2PP1/R1BQR1K1 w Qq - 0 1',
        url: 'https://lichess.org/study/Iofs72fq/p2B5CNpn'
    },

    {
        path: ['TdB Chronologique', 'TdB8', 'Mat du Guéridon'],
        title: 'TdB8-3 : Pokojowczyk - Timochtchenko (Polanica-Zdroj, 1979)',
        fen: '4r1k1/5ppp/p2p1b1P/3P1bP1/1Q3P2/1P3K2/1P1R2R1/6Bq b - - 3 1',
        url: 'https://lichess.org/study/Iofs72fq/DgUNazRP'
    },

    {
       path: ['TdB Chronologique', 'TdB8', 'Finales {RT} vs {rpp}{rpp} - {pp} passés liés éloignés des Rois'],
        title: 'TdB8-4 : J. Moravec (28 Rijen, 1924)',
        fen: '8/k7/2K5/8/8/8/6pp/1R6 w - - 0 1',
        url: 'https://lichess.org/study/Iofs72fq/N6Nou8GA'
    },

    {
        path: ['TdB Chronologique', 'TdB8', 'Finales {RT} vs {rpp}{rpp} - {pp} passés liés éloignés des Rois'],
        title: 'TdB8-5 : J. Kling & B. Horwitz (Chess Studies, 1851)',
        fen: '8/8/5K2/7k/8/p7/1p6/1R6 w - - 9 1',
        url: 'https://lichess.org/study/Iofs72fq/j2ftbp46'
    },

    {
        path: ['TdB Chronologique', 'TdB8', 'Etude - Le Zugzwang de Schapiro / Kling & Horwitz'],
        title: 'TdB8-6 : M. Schapiro (Rheinische Volkswacht, 1920)',
        fen: '8/8/8/3R4/2K5/6pp/k7/8 w - - 0 1',
        url: 'https://lichess.org/study/Iofs72fq/bgHeSJAX'
    },




    // ---------- TdB9 ----------

    {
        path: ['TdB Chronologique', 'TdB9', 'Mat en Queue d\'Aronde'],
        title: 'TdB9-1 : Tasic - Dorfman (Nice, 1993)',
        fen: '2q5/1r2Bp1k/4pQpN/1pp1P2p/2p5/6P1/1P2PPKP/3r4 w - - 7 1',
        url: 'https://lichess.org/study/p2znRfiY/KPNmxRf1'
    },

    {
        path: ['TdB Chronologique', 'TdB9', 'Mat en Queue d\'Aronde'],
        title: 'TdB9-2 : Luo - Ismagambetov (Kuala Lumpur, 2002)',
        fen: '2r5/4k1pp/p2p4/BpnPp3/4q3/5Q2/PP1K1bPP/3R1R2 b - - 5 1',
        url: 'https://lichess.org/study/p2znRfiY/SUNgMOYf'
    },

    {
        path: ['TdB Chronologique', 'TdB9', 'Mat en Queue d\'Aronde'],
        title: 'TdB9-3 : Bellon Lopez - Smejkal (Siegen, 1970)',
        fen: '5rk1/1p1b3p/2pp2p1/p7/2Pb2Pq/1P1PpP2/P1N1K1RP/1RQ5 b - - 4 1',
        url: 'https://lichess.org/study/p2znRfiY/o2aohwIU'
    },

    {
       path: ['TdB Chronologique', 'TdB9', 'Finales {RP} vs {rp} - {P}/{p} bloqués - Cases clés latérales'],
        title: 'TdB9-4 : A. Villeneuve (Les Finales, 1982)',
        fen: '4k3/8/4p3/4P3/8/3K4/8/8 w - - 8 1',
        url: 'https://lichess.org/study/p2znRfiY/aJJ6Y4Ih',
        marks: 'border:vert:d6,e6,f6,g6,h6,h7,h8,g8,g7,f7,f8,e7,d8,d7,e8,c6,b6,b7,b8,c8,c7 disc:vert:b6,c6,d6,f6,g6,h6 text=1:bleu:c5 text=2:bleu:b5 text=2:rouge:b7 text=1:rouge:c7 cross:rouge:d5 text=3:cyan:b4,c4 text=3:rose:b8,c8'
    },

    {
        path: ['TdB Chronologique', 'TdB9', 'Finales {RP} vs {rp} - {P}/{p} bloqués - Cases clés latérales'],
        title: 'TdB9-5 : Inédit (TdB9, 2025)',
        fen: '3k4/8/4p3/4P3/8/2K5/8/8 w - - 8 1',
        url: 'https://lichess.org/study/p2znRfiY/D0rLpMg7',
        marks: 'border:vert:d6,e6,f6,g6,h6,h7,h8,g8,g7,f7,f8,e7,d8,d7,e8,c6,b6,b7,b8,c8,c7 disc:vert:b6,c6,d6,f6,g6,h6 text=1:bleu:c5 text=2:bleu:b5 text=2:rouge:b7 text=1:rouge:c7 cross:rouge:d5 text=3:cyan:b4,c4 text=3:rose:b8,c8'
    },

    {
        path: ['TdB Chronologique', 'TdB9', 'Etude - La Transposition de Fahrni'],
        title: 'TdB9-6 : H. Fahrni (Das Endspiel im Schach, 1917)',
        fen: 'k1N5/2p5/8/1P6/8/8/6K1/8 w - - 8 1',
        url: 'https://lichess.org/study/p2znRfiY/JEaGCFjU'
    },



    // ---------- TdB10 ----------

    {
        path: ['TdB Chronologique', 'TdB10', 'Mat de Vukovic'],
        title: 'TdB10-1 : Torre - Ljubojevic (Manille, 1976)',
        fen: '6k1/1R6/8/3NKN1p/1P2p3/2P2r2/5r2/8 w - - 0 1',
        url: 'https://lichess.org/study/5ftHnQkJ/34RxMTkm'
    },

    {
        path: ['TdB Chronologique', 'TdB10', 'Mat de Vukovic'],
        title: 'TdB10-2 : Spassky - Larsen (Malmö, 1968)',
        fen: '3r1k2/1R6/5N2/p2PP1K1/8/7P/5p2/3b4 w - - 0 1',
        url: 'https://lichess.org/study/5ftHnQkJ/3o61MX3J'
    },

    {
        path: ['TdB Chronologique', 'TdB10', 'Mat de Vukovic'],
        title: 'TdB10-3 : Schiller - Redman (Chicago, 1975)',
        fen: '4Qbr1/2q4p/knNp4/3P1p2/P1p5/2P3P1/5P1P/1R4K1 w - - 0 1',
        url: 'https://lichess.org/study/5ftHnQkJ/hrQ2Yx34'
    },

    {
       path: ['TdB Chronologique', 'TdB10', 'Finales {RTP} vs {rt} - Défense passive avec {P}-Fou'],
        title: 'TdB10-4 : M. Dvoretsky (Le Manuel des Finales, 2004)',
        fen: 'r5k1/8/5PK1/8/8/8/8/1R6 w - - 0 1',
        url: 'https://lichess.org/study/5ftHnQkJ/uaLnn7tY'
    },

    {
        path: ['TdB Chronologique', 'TdB10', 'Finales {RTP} vs {rt} - Défense passive avec {P}-Cavalier'],
        title: 'TdB10-5 : M. Dvoretsky (Le Manuel des Finales, 2004)',
        fen: 'r5k1/8/6PK/8/8/8/8/1R6 w - - 0 1',
        url: 'https://lichess.org/study/5ftHnQkJ/XDfCXrOR'
    },

    {
        path: ['TdB Chronologique', 'TdB10', 'Etude - L\'Interception de Heuäcker'],
        title: 'TdB10-6 : P. Heuäcker (Neue Freie Presse, 1930)',
        fen: '1B6/8/7P/4p3/3b3k/8/8/2K5 w - - 12 1',
        url: 'https://lichess.org/study/5ftHnQkJ/uHUY8MBf'
    },



    // ---------- TdB11 ----------

    {
        path: ['TdB Chronologique', 'TdB11', 'Mat de l\'Hameçon'],
        title: 'TdB11-1 : Kazhgaleiev - J. Polgar (Calatrava, 2007)',
        fen: '1r4k1/2R5/3p4/3P2B1/p1p4p/2b2RnP/P5P1/6K1 b - - 0 1',
        url: 'https://lichess.org/study/qwVCWJlT/jBquYGQq'
    },

    {
        path: ['TdB Chronologique', 'TdB11', 'Mat de l\'Hameçon'],
        title: 'TdB11-2 : Gagunashvili - Kalegin (Moscou, 2006)',
        fen: '1Qb5/5pk1/6p1/3N2P1/7p/p6P/6BK/2q5 w - - 0 1',
        url: 'https://lichess.org/study/qwVCWJlT/kbXsRtAF'
    },

    {
        path: ['TdB Chronologique', 'TdB11', 'Mat de l\'Hameçon'],
        title: 'TdB11-3 : Bulmaga - Kashlinskaya (Kharkov, 2007)',
        fen: '6kr/3b3r/2p2p2/1p1q1P2/p2p2pN/3P4/PPP1RKPQ/7R w - - 0 1',
        url: 'https://lichess.org/study/qwVCWJlT/J3QV4bHl'
    },

    {
       path: ['TdB Chronologique', 'TdB11', 'Finales {RPP} vs {rp} - {P}/{p} bloqués + {P} arriéré - Cases clés)'],
        title: 'TdB11-4 : Kovacs - Rigo (Hongrie, 1973)',
        fen: '1K6/8/4k3/8/5p2/5P2/4P3/8 b - - 11 1',
        url: 'https://lichess.org/study/qwVCWJlT/a3F0xNhN'
    },

    {
        path: ['TdB Chronologique', 'TdB11', 'Finales {RPP} vs {rp} - {P}/{p} bloqués + {P} arriéré - Cases clés)'],
        title: 'TdB11-5 : Baron Rodriguez - Minzer (Mancha Real, 2000)',
        fen: '8/3k4/3p4/3P4/2PK4/8/8/8 b - - 21 1',
        url: 'https://lichess.org/study/qwVCWJlT/4P1x7hhW'
    },

    {
        path: ['TdB Chronologique', 'TdB11', 'Etude - Le Contournement de Dedrle'],
        title: 'TdB11-6 : F. Dedrle (Deutsches Wochenschach, 1921)',
        fen: '8/4k3/3p4/3P4/2P5/8/8/5K2 w - - 11 1',
        url: 'https://lichess.org/study/qwVCWJlT/YszQUMO1'
    },



    // ---------- TdB12 ----------

    {
        path: ['TdB Chronologique', 'TdB12', 'Mat des Cochons aveugles'],
        title: 'TdB12-1 : Swiderski - Nimzovitsch (Barmen, 1905)',
        fen: 'r4rk1/2R2p2/1n2N1pp/2Rp4/p2P4/P3P1QP/qP3PPK/8 w - - 0 1',
        url: 'https://lichess.org/study/OsXJ1z73/ilvOJMj8'
    },

    {
        path: ['TdB Chronologique', 'TdB12', 'Mat des Cochons aveugles'],
        title: 'TdB12-2 : Ivanchuk - Aronian (Morelia-Linares, 2006)',
        fen: '5rk1/1R1R1p1p/6p1/p1N1p3/5P2/1P4P1/r2nP1KP/8 w - - 0 1',
        url: 'https://lichess.org/study/OsXJ1z73/VKtfAVv4'
    },

    {
        path: ['TdB Chronologique', 'TdB12', 'Mat des Cochons aveugles'],
        title: 'TdB12-3 : Alekhine - Yates (Londres, 1922)',
        fen: 'r5r1/2R2Rpk/b3p2p/3pNp1P/p2P1K2/Pp2PPP1/1P6/8 w - - 0 1',
        url: 'https://lichess.org/study/OsXJ1z73/plo5AYtG'
    },

    {
       path: ['TdB Chronologique', 'TdB12', 'Finales {RD} vs {rp} - {p}-Tour en 7e'],
        title: 'TdB12-4 : Hernando Rodrigo - Sorroche Martin (Vila de Salou, 1995)',
        fen: '6Q1/8/8/6K1/8/8/6kp/8 w - - 0 1',
        url: 'https://lichess.org/study/OsXJ1z73/zQo88krk'
    },

    {
        path: ['TdB Chronologique', 'TdB12', 'Finales {RD} vs {rp} - {p}-Tour en 7e'],
        title: 'TdB12-5 : Leentjens - Huizinga (Groningue, 2004)',
        fen: '8/2Q5/8/8/8/8/pk2K3/8 w - - 0 1',
        url: 'https://lichess.org/study/OsXJ1z73/LVtkaKDW'
    },

    {
        path: ['TdB Chronologique', 'TdB12', 'Etude - L\'Ecran de Salvio'],
        title: 'TdB12-6 : A. Salvio (Trattato dell\'Inventione et Arte Liberale del Gioco di Scacchi, 1634)',
        fen: '8/1QK5/8/8/8/8/p7/k7 w - - 0 1',
        url: 'https://lichess.org/study/OsXJ1z73/PAArBalA'
    },



    // ---------- TdB13 ----------

    {
        path: ['TdB Chronologique', 'TdB13', 'Mat de Greco'],
        title: 'TdB13-1 : Johnston - Marshall (Chicago, 1899)',
        fen: 'r2q1rk1/pbp3pp/1p1b4/3N1p2/2B5/P3PPn1/1P3P1P/2RQK2R w - - 0 1',
        url: 'https://lichess.org/study/9u4n3THl/LQr63QnQ'
    },

    {
        path: ['TdB Chronologique', 'TdB13', 'Mat de Greco'],
        title: 'TdB13-2 : Nimzowitsch - Capablanca (San Sebastian, 1911)',
        fen: '5r1k/p3n1pp/1p6/1PP2p2/P2Pn3/3b1Bb1/1B4P1/R1R4K b - - 0 1',
        url: 'https://lichess.org/study/9u4n3THl/wMgtdSeC'
    },

    {
        path: ['TdB Chronologique', 'TdB13', 'Mat de Greco'],
        title: 'TdB13-3 : Aleksandrov - Zaitsev (URSS, 1973)',
        fen: '2k1r2r/ppn3pq/b7/5p2/5Qn1/2N1B1P1/1P3PB1/2RR2K1 w - - 0 1',
        url: 'https://lichess.org/study/9u4n3THl/OPsEJ6WE'
    },

    {
       path: ['TdB Chronologique', 'TdB13', 'Finales {RTP} vs {rt} - {P}-Tour en 7e - {T} devant - Défense du Triangle'],
        title: 'TdB13-4 : Moorehouse - Stephenson (London, Canada, 1995)',
        fen: '8/5k2/R7/8/8/5K2/p7/r7 w - - 0 1',
        url: 'https://lichess.org/study/9u4n3THl/BzutLgOk'
    },

    {
        path: ['TdB Chronologique', 'TdB13', 'Finales {RTP} vs {rt} - {P}-Tour en 7e - {T} devant - Défense du Triangle'],
        title: 'TdB13-5 : Pogonina - Straub (Internet, 2004)',
        fen: '8/6p1/8/R4p1k/5P2/8/p5K1/r7 w - - 0 1',
        url: 'https://lichess.org/study/9u4n3THl/CMWxV6Uf'
    },

    {
        path: ['TdB Chronologique', 'TdB13', 'Etude - Les Fourchettes de Somov Nasimovitch'],
        title: 'TdB13-6 : E. Somov Nasimovitch (64, 1927)',
        fen: 'k1N4K/2R5/8/8/8/8/1p5P/8 w - - 0 1',
        url: 'https://lichess.org/study/9u4n3THl/pgoJtKiH'
    },



    // ---------- TdB14 ----------

    {
        path: ['TdB Chronologique', 'TdB14', 'Mat du Corridor Diagonal'],
        title: 'TdB14-1 : Morphy - NN (Nouvelle Orléans, 1850)',
        fen: 'r1bq3r/ppk3pp/3b4/3Q4/3p1B2/8/PPP2PPP/4R1K1 w - - 0 1',
        url: 'https://lichess.org/study/6QVcrTwJ/mAh3DpKX'
    },

    {
        path: ['TdB Chronologique', 'TdB14', 'Mat du Corridor Diagonal'],
        title: 'TdB14-2 : Capablanca - Spielmann (San Sebastian, 1911)',
        fen: '7k/ppq1b1pp/8/2P5/1P2R1Q1/2P5/P2B1rPp/7K w - - 0 1',
        url: 'https://lichess.org/study/6QVcrTwJ/7hpEx5eO'
    },

    {
        path: ['TdB Chronologique', 'TdB14', 'Mat du Corridor Diagonal'],
        title: 'TdB14-3 : Fernandez - Lommer (Valence, 1967)',
        fen: '2r4k/7p/8/8/4Q3/1P1B4/P2p1q2/K2R4 b - - 0 1',
        url: 'https://lichess.org/study/6QVcrTwJ/hAJxDAEe'
    },

    {
       path: ['TdB Chronologique', 'TdB14', 'Etude - L\'Ecran de Berger'],
        title: 'TdB14-4 : J. Berger (Theorie und Praxis der Endspiele, 1890)',
        fen: 'R7/P5K1/8/6k1/8/8/8/r7 w - - 0 1',
        url: 'https://lichess.org/study/6QVcrTwJ/hy8y3nfS'
    },

    {
        path: ['TdB Chronologique', 'TdB14', 'Etude - L\'Ecran de Marik/Troitzky'],
        title: 'TdB14-5 : B. Marik (Ceskoslovensky Sach, 1953)',
        fen: 'R6K/P7/8/8/8/7k/8/r7 w - - 0 1',
        url: 'https://lichess.org/study/6QVcrTwJ/fcAQqEB9'
    },

    {
        path: ['TdB Chronologique', 'TdB14', 'Finales {RTP} vs {rt} - {P}-Tour en 7e - {T} devant - Défense par Ecran du {R}'],
        title: 'TdB14-6 : Kolinski - Kuziemko (Kolobrzeg, 2009)',
        fen: '7R/7P/4pK2/8/4k3/8/8/6r1 b - - 0 1',
        url: 'https://lichess.org/study/6QVcrTwJ/ItxAt8Nm'
    },



    // ---------- TdB15 ----------

    {
        path: ['TdB Chronologique', 'TdB15', 'Mat de Damiano'],
        title: 'TdB15-1 : Model - Goldberg (Leningrad, 1932)',
        fen: '2r2k1r/pB3pp1/4p3/Q1p1P3/3P2p1/2P1q3/PP3RP1/R5K1 b Qk - 0 1',
        url: 'https://lichess.org/study/8i2iG3Uj/xdwWxE1f'
    },

    {
        path: ['TdB Chronologique', 'TdB15', 'Mat de Damiano'],
        title: 'TdB15-2 : NN - NN (Rapide, Chandler 1998, How to beat your Dad at Chess)',
        fen: 'k1rq3r/p1p2p2/1p2p1p1/P2pPn2/2nP1P1p/1NP5/2PBQ1PP/RR5K b Qk - 0 1',
        url: 'https://lichess.org/study/8i2iG3Uj/QYhH4oQp'
    },

    {
        path: ['TdB Chronologique', 'TdB15', 'Mat de Damiano'],
        title: 'TdB15-3 : Baburine - Adianto (Liechtenstein, 1993)',
        fen: 'q1r1k2r/1b3pp1/p3p3/P1b4n/1pN1P2p/3BBP2/1P2Q1PP/R4R1K b Qk - 0 1',
        url: 'https://lichess.org/study/8i2iG3Uj/YBQQ9Rpt'
    },

    {
       path: ['TdB Chronologique', 'TdB15', 'Finales {RTP} vs {rt} - {P}-Tour en 7e - {T} devant - Défense par Ecran de la {t} - batterie {tr} éloignée du {P}'],
        title: 'TdB15-4 : N. Kopaiev & Y. Averbakh (Shakhmatnye Okonchaniya, 1958)',
        fen: 'R7/P2K4/7k/8/8/8/8/6r1 b - - 0 1',
        url: 'https://lichess.org/study/8i2iG3Uj/wHNn4v0e'
    },

    {
        path: ['TdB Chronologique', 'TdB15', 'Finales {RTP} vs {rt} - {P}-Tour en 7e - {T} devant - Défense par Ecran de la {t} - batterie {tr} éloignée du {P}'],
        title: 'TdB15-5 : Zaitsenkov - Logun (Tallinn, 2001)',
        fen: '8/8/8/5k2/8/2K5/3R3p/7r w - - 0 1',
        url: 'https://lichess.org/study/8i2iG3Uj/pUKRaujU'
    },

    {
        path: ['TdB Chronologique', 'TdB15', 'Etude - Le Zugzwang de Romanovsky'],
        title: 'TdB15-6 : P. Romanovsky (Shakhmaty v SSSR, 1938)',
        fen: 'R7/P6r/8/1K6/8/8/7k/8 w - - 0 1',
        url: 'https://lichess.org/study/8i2iG3Uj/WQNJqBbJ'
    },



    // ---------- TdB16 ----------

    {
        path: ['TdB Chronologique', 'TdB16', 'Mat de Lolli'],
        title: 'TdB16-1 : Hoogendoorn - Günther (Nimègue, 1992)',
        fen: '1r3rk1/5ppp/p4P2/2pP4/2n1p3/1q6/1P1QB1PP/1R3RK1 w - - 0 1',
        url: 'https://lichess.org/study/7uiPAONy/GItCM4eN'
    },

    {
        path: ['TdB Chronologique', 'TdB16', 'Mat de Lolli'],
        title: 'TdB16-2 : Bors - Szeberenyi (Hongrie, 2001)',
        fen: '2b1r1k1/pp3p1p/2p2Pp1/4P3/1qPR1Q2/6PP/6BK/8 w - - 0 1',
        url: 'https://lichess.org/study/7uiPAONy/3zgYG2kU'
    },

    {
        path: ['TdB Chronologique', 'TdB16', 'Mat de Lolli'],
        title: 'TdB16-3 : Menchik - Thomas (Londres, 1932)',
        fen: 'r4r2/q1pb1pkp/1p1p2p1/2nPpP1P/2P1P3/p1N2P2/PP1Q4/2KR1BR1 w - - 0 1',
        url: 'https://lichess.org/study/7uiPAONy/xNCmEN7n'
    },

    {
       path: ['TdB Chronologique', 'TdB16', 'Finales {RTP} vs {rt} - {P}-Tour en 7e - {T} devant - Défense par Ecran de la {t} - batterie {tr} proche du {P}'],
        title: 'TdB16-4 : Tarrasch - Johner (Teplitz-Schönau, 1922)',
        fen: 'R7/P6r/8/3k4/8/2K5/8/8 b - - 0 1',
        url: 'https://lichess.org/study/7uiPAONy/Vz5hnzlv'
    },

    {
        path: ['TdB Chronologique', 'TdB16', 'Finales {RTP} vs {rt} - {P}-Tour en 7e - {T} devant - Défense par Ecran de la {t} - batterie {tr} proche du {P}'],
        title: 'TdB16-5 : Bodrogi - Torok (Budapest, 2009)',
        fen: '7R/3r3P/8/4k3/5p2/8/4K3/8 b - - 13 1',
        url: 'https://lichess.org/study/7uiPAONy/RUUewl4i'
    },

    {
        path: ['TdB Chronologique', 'TdB16', 'Etude - Le Zugzwang de Chéron'],
        title: 'TdB16-6 : A. Chéron (La Fin de Partie : Une Tour et un Pion contre une Tour, 1923)',
        fen: 'R7/P1r5/8/8/8/8/8/K1k5 w - - 0 1',
        url: 'https://lichess.org/study/7uiPAONy/9kvgXJuc'
    },

    {
        path: ['TdB Chronologique', 'TdB16', 'Etude - Le Zugzwang de Chéron'],
        title: 'TdB16-7 : A. Chéron (La Fin de Partie : Une Tour et un Pion contre une Tour, 1923)',
        fen: 'R7/P1r5/8/8/8/8/8/K1k5 b - - 0 1',
        url: 'https://lichess.org/study/7uiPAONy/eEE9XTcR'
    },


    // ---------- TdB17 ----------

    {
        path: ['TdB Chronologique', 'TdB17', 'Mat de Morphy'],
        title: 'TdB17-1 : Palmer - Moody (Cadillac USA, 2019)',
        fen: '4r2k/1p3p1p/p2r4/6B1/P1bp2R1/2N5/1P5P/6RK w - - 0 1',
        url: 'https://lichess.org/study/ZKYpuooK/MV8EdMMd'
    },

    {
        path: ['TdB Chronologique', 'TdB17', 'Mat de Morphy'],
        title: 'TdB17-2 : Reshevsky - Shainswit (New York, 1951)',
        fen: '2r2rk1/5ppp/pp6/2q5/2P1pP2/3QPRnP/P5P1/B1R3K1 w - - 0 1',
        url: 'https://lichess.org/study/ZKYpuooK/TGYSW7oS'
    },

    {
        path: ['TdB Chronologique', 'TdB17', 'Mat de Morphy'],
        title: 'TdB17-3 : Nimzowitsch - Nielsen (Copenhague, 1930)',
        fen: '3r1rk1/p2R1ppp/1p1bp3/3qB3/3PR3/5Q1P/PP3PP1/6K1 w - - 0 1',
        url: 'https://lichess.org/study/ZKYpuooK/hEWSwgf5'
    },

    {
       path: ['TdB Chronologique', 'TdB17', 'Finales {RTP} vs {rt} - {P}-Tour en 7e - {T} devant - Défense par Ecran de la {t} - batterie {tr} centrale'],
        title: 'TdB17-4 : Murshed - Serper (Dhaka, 1995)',
        fen: '8/3k4/8/8/3K4/8/p3R3/r7 w - - 7 1',
        url: 'https://lichess.org/study/ZKYpuooK/mF1hMLLD'
    },

    {
        path: ['TdB Chronologique', 'TdB17', 'Finales {RTP} vs {rt} - {P}-Tour en 7e - {T} devant - Défense par Ecran de la {t} - batterie {tr} centrale'],
        title: 'TdB17-5 : Ionescu - Gutman (Bienne, 1990)',
        fen: 'R7/P2r4/4k3/8/4K3/8/8/8 b - - 0 1',
        url: 'https://lichess.org/study/ZKYpuooK/pjtgfvgi'
    },

    {
        path: ['TdB Chronologique', 'TdB17', 'Etude - Le Zugzwang central de Moravec'],
        title: 'TdB17-6 : J. Moravec (Československý Šach, 1931)',
        fen: '8/8/8/2k5/8/4K3/3R3p/7r w - - 0 1',
        url: 'https://lichess.org/study/ZKYpuooK/tEIajeFk'
    },



    // ---------- TdB18 ----------

    {
        path: ['TdB Chronologique', 'TdB18', 'Mat de Pillsbury'],
        title: 'TdB18-1 : Stepanow - NN (Riga, 1899)',
        fen: 'r2q1rk1/ppp2ppp/2np4/8/4P3/P2n1P1P/1BB2P1K/R5R1 w - - 0 1',
        url: 'https://lichess.org/study/jXpZv9Ui/KBMDWmH7'
    },

    {
        path: ['TdB Chronologique', 'TdB18', 'Mat de Pillsbury'],
        title: 'TdB18-2 : Savic - Radojevic (Herceg Novi, 2006)',
        fen: '5rk1/prp2p1p/4n2B/7p/1qBPP2P/1P3P2/P2Q1P2/1K5R w - - 0 1',
        url: 'https://lichess.org/study/jXpZv9Ui/1ngftN9p'
    },

    {
        path: ['TdB Chronologique', 'TdB18', 'Mat de Pillsbury'],
        title: 'TdB18-3 : Pillsbury - Newman (Philadelphie, 1900)',
        fen: '5rk1/prpn1p1p/1p3p1B/8/3P4/4P3/PP3PqP/R2QK2R w - - 0 1',
        url: 'https://lichess.org/study/jXpZv9Ui/t9g61Uvc'
    },

    {
       path: ['TdB Chronologique', 'TdB18', 'Finales {RPP} vs {rp} - {P}/{p} bloqués - {P} passé protégé'],
        title: 'TdB18-4 : J. Buijs & R. Hendriks (Spiegelen Springen Schuiven Draaien, 1993)',
        fen: '8/8/8/4k3/6pP/6P1/K7/8 w - - 0 1',
        url: 'https://lichess.org/study/jXpZv9Ui/gWdxns2o',
        marks: 'border:vert:f4,e4,d4,d5,d6,d7,e7,f7,g7,h7,h6,h5,g5,f5,e5,e6,f6,g6 cross:bleu:f4,g5 cross:rouge:f3 text=1:rouge:e5 text=2:rouge:d5 text=3:rouge:e4 text=4:rouge:d4 text=5:rouge:e6 text=6:rouge:d6 text=7:rouge:e7 text=8:rouge:d7 text=9:rouge:f6 text=10:rouge:g6 text=11:rouge:h6 text=11:bleu:h8 text=10:bleu:g8 text=9:bleu:f8 text=5:bleu:e8 text=6:bleu:d8,b8,b6 text=5:bleu:c8,c6 text=7:bleu:c7 text=8:bleu:b7 text=1:bleu:c5,c3,e3 text=2:bleu:d3,b5,b3 text=3:bleu:c4 text=4:bleu:b4 label=1%27:bleu:a3 label=3%27:bleu:a4 label=1%27:bleu:a5 label=5%27:bleu:a6 label=7%27:bleu:a7 label=5%27:bleu:a8'
    },

    {
        path: ['TdB Chronologique', 'TdB18', 'Finales {RPP} vs {rp} - {P}/{p} bloqués - {P} passé protégé'],
        title: 'TdB18-5 : F. Dedrle (Studie, 1925)',
        fen: '8/2k5/8/8/Pp6/1P6/6K1/8 b - - 0 1',
        url: 'https://lichess.org/study/jXpZv9Ui/3vjTiAKd',
        marks: 'border:vert:b4,c4,d4,e4,e5,e6,e7,d7,c7,b7,a7,a6,a5,b5,c5,d5,d6,c6,b6 cross:rouge:c3 cross:bleu:b5,c4 text=1:bleu:d3 text=2:bleu:e3 text=1:bleu:f3,f5 text=2:bleu:g3,g5 text=2:rouge:e5 text=1:rouge:d5 text=3:rouge:d4 text=4:rouge:e4 text=6:rouge:e6 text=5:rouge:d6 text=7:rouge:d7 text=8:rouge:e7 text=9:rouge:c6 text=10:rouge:b6 text=11:rouge:a6 text=3:bleu:f4 text=4:bleu:g4 text=5:bleu:f6 text=6:bleu:g6 text=7:bleu:f7 text=8:bleu:g7 text=6:bleu:g8 text=5:bleu:f8 text=6:bleu:e8 text=5:bleu:d8 text=9:bleu:c8 text=10:bleu:b8 text=11:bleu:a8 label=1%27:bleu:h3,h5 label=3%27:bleu:h4 label=5%27:bleu:h6 label=7%27:bleu:h7 label=5%27:bleu:h8'
    },

    {
        path: ['TdB Chronologique', 'TdB18', 'Etude - Le Rempart de Bianchetti'],
        title: 'TdB18-6 : R. Bianchetti (Contributo alla Teoria dei Finali di soli Pedoni, 1925)',
        fen: '8/8/1p6/pP6/8/K7/8/k7 w - - 0 1',
        url: 'https://lichess.org/study/jXpZv9Ui/OZ2yCq8F',
        marks: 'border:orange:c5,d5,e5,e4,b5,a4,b4,c4,d4,e3,e2,d2,c2,b2,a2,a3,b3,c3,d3 cross:rouge:b4,c5 cross:bleu:c6 text=3:bleu:d5 text=4:bleu:e5 text=1:bleu:d4 text=2:bleu:e4 text=5:bleu:d3 text=6:bleu:e3 text=7:bleu:d2 text=8:bleu:e2 text=9:bleu:c3 text=10:bleu:b3 text=11:bleu:a3 text=11:rouge:a1 text=10:rouge:b1 text=9:rouge:c1 text=5:rouge:d1 text=6:rouge:e1 text=5:rouge:f1 text=6:rouge:g1,g3 text=5:rouge:f3 text=7:rouge:f2 text=8:rouge:g2 text=1:rouge:f4 text=2:rouge:g4 text=3:rouge:f5 text=4:rouge:g5 text=1:rouge:d6 text=2:rouge:e6,g6 text=1:rouge:f6 label=1%27:rouge:h6,h4 label=3%27:rouge:h5 label=5%27:rouge:h3 label=7%27:rouge:h2 label=5%27:rouge:h1'
    },



    // ---------- TdB19 ----------

    {
        path: ['TdB Chronologique', 'TdB19', 'Mat de Balestra'],
        title: 'TdB19-1 : Kotronias - Arlandi (Yerevan, 1996)',
        fen: '7r/p3Q3/4p1k1/2p1Pb1p/8/2B2P2/rP3K2/8 w - - 4 1',
        url: 'https://lichess.org/study/NbcTHbc2/yUI2QnNm'
    },

    {
        path: ['TdB Chronologique', 'TdB19', 'Mat de Balestra'],
        title: 'TdB19-2 : Yanofsky - Reshevsky (Dallas, 1957)',
        fen: '8/3kP3/3b1Qp1/1q4B1/6P1/2p5/5P2/6K1 w - - 0 1',
        url: 'https://lichess.org/study/NbcTHbc2/CIm5iLqA'
    },

    {
        path: ['TdB Chronologique', 'TdB19', 'Mat de Balestra'],
        title: 'TdB19-3 : Millet - Franciskovic (Hersonissos, 2017)',
        fen: '3qr3/1p1k3b/2n1p2P/1NQpP1p1/1p4P1/5P2/1P2BK2/7R w - - 0 1',
        url: 'https://lichess.org/study/NbcTHbc2/upqLdl33'
    },

    {
       path: ['TdB Chronologique', 'TdB19', 'Finales {RD} vs {rp} - {p}-Fou en 7e - {r} petit côté'],
        title: 'TdB19-4 : Seidemann - Jahn (Eilenbourg, 1984)',
        fen: '8/1qk2PK1/8/8/8/8/8/8 b - - 0 1',
        url: 'https://lichess.org/study/NbcTHbc2/df4cMHv4'
    },

    {
        path: ['TdB Chronologique', 'TdB19', 'Finales {RD} vs {rp} - {p}-Fou en 7e - {r} petit côté'],
        title: 'TdB19-5 : Sundell - von Bahr (Haninge, 1997)',
        fen: '6K1/5P2/8/4q3/6k1/8/8/8 b - - 0 1',
        url: 'https://lichess.org/study/NbcTHbc2/CAIH2BYr'
    },

    {
        path: ['TdB Chronologique', 'TdB19', 'Etude - L\'enfilade de Cohn'],
        title: 'TdB19-6 : H. Cohn (Morgen-Zeitung, 1928)',
        fen: '8/8/8/1p2k3/4q3/4R1K1/8/8 w - - 0 1',
        url: 'https://lichess.org/study/NbcTHbc2/mSG4ShIf'
    },



    // ---------- TdB20 ----------

    {
        path: ['TdB Chronologique', 'TdB20', 'Mat de Blackburne'],
        title: 'TdB20-1 : Stefánsson - Bruzón Batista (La Havane, 2001)',
        fen: '2q1rrk1/1b1pb2p/p3p1p1/1p2B1Nn/4BP2/PP6/2P1Q1PP/R4R1K w - - 0 1',
        url: 'https://lichess.org/study/T8YLWdU5/DkrmC5LZ'
    },

    {
        path: ['TdB Chronologique', 'TdB20', 'Mat de Blackburne'],
        title: 'TdB20-2 : Flohr - Pitschak (Bilina, 1930)',
        fen: 'r2r2k1/pb3ppp/1p1bpn2/7q/3n4/1P1B2P1/PB1N1P1P/RQ2NRK1 b - - 0 1',
        url: 'https://lichess.org/study/T8YLWdU5/ePGntR2f'
    },

    {
        path: ['TdB Chronologique', 'TdB20', 'Mat de Blackburne'],
        title: 'TdB20-3 : Olesen - Buehl (Dearborn, 1992)',
        fen: '3b1rk1/p1q2p1p/bp2p1p1/2p2nNn/2P3N1/7Q/PB3PPP/1BR3K1 w - - 0 1',
        url: 'https://lichess.org/study/T8YLWdU5/ajDRJ3iv'
    },

    {
       path: ['TdB Chronologique', 'TdB20', 'Finales {RD} vs {rp} - {p}-Fou en 7e - {r} grand côté'],
        title: 'TdB20-4 : Soubirou - Neuhauser (Aix-les Bains, 2009)',
        fen: '8/2P5/3K4/8/1k6/8/8/q7 b - - 0 1',
        url: 'https://lichess.org/study/T8YLWdU5/aD6QwSbf'
    },

    {
        path: ['TdB Chronologique', 'TdB20', 'Finales {RD} vs {rp} - {p}-Fou en 7e - {r} grand côté'],
        title: 'TdB20-5 : Schlender - Trzaska (Ruhrgebiet, 1997)',
        fen: '8/5P2/5K2/1k6/8/6q1/8/8 b - - 0 1',
        url: 'https://lichess.org/study/T8YLWdU5/xMao6akU'
    },

    {
        path: ['TdB Chronologique', 'TdB20', 'Etude - Le Rouleau Compresseur de Kling & Horwitz'],
        title: 'TdB20-6 : J. Kling & B. Horwitz (Chess Studies, 1851)',
        fen: '8/8/8/2p5/2Pp4/3K2Pk/7P/8 w - - 0 1',
        url: 'https://lichess.org/study/T8YLWdU5/KIeqQiSN'
    },



    // ---------- TdB21 ----------

    {
        path: ['TdB Chronologique', 'TdB21', 'La Fourchette'],
        title: 'TdB21-1 : Euwe - Davidson (Amsterdam, 1924)',
        fen: '6k1/p4p1p/1p3np1/2q5/4p3/4P1N1/PP3PPP/3Q2K1 w - - 0 1',
        url: 'https://lichess.org/study/jgWiiJt2/CWyIFt9o'
    },

    {
        path: ['TdB Chronologique', 'TdB21', 'La Fourchette'],
        title: 'TdB21-2 : Petrossian - Spassky (Moscou, 1966)',
        fen: '6k1/r4r1p/p2NB3/nppP2q1/2P5/1P2N3/PQ5P/7K w - - 0 1',
        url: 'https://lichess.org/study/jgWiiJt2/uFYTmJ2R'
    },

    {
        path: ['TdB Chronologique', 'TdB21', 'La Fourchette'],
        title: 'TdB21-3 : Bogolioubov - Müller (Triberg, 1934)',
        fen: '2k4r/1pp2ppp/p1p1bn2/4N3/1q1rP3/2N1Q3/PPP2PPP/R4RK1 w - - 0 1',
        url: 'https://lichess.org/study/jgWiiJt2/XKwmWOYb'
    },

    {
       path: ['TdB Chronologique', 'TdB21', 'Finales {RTP} vs {rt} - {P} en 7e et {R} devant - {r} coupé verticalement - Position de Lucena'],
        title: 'TdB21-4 : A. Salvio (Il Puttino, 1634)',
        fen: '1K1k4/1P6/8/8/8/8/r7/2R5 w - - 0 1',
        url: 'https://lichess.org/study/jgWiiJt2/2llsT8Gv'
    },

    {
        path: ['TdB Chronologique', 'TdB21', 'Finales {RTP} vs {rt} - {P} en 7e et {R} devant - {r} coupé verticalement - Position de Lucena'],
        title: 'TdB21-5 : Frit - Iagar (Muret, 2025)',
        fen: '2K5/2P1k3/5pp1/4p2p/7P/6P1/3R1P2/1r6 w - - 1 1',
        url: 'https://lichess.org/study/jgWiiJt2/5cwCKoNX'
    },

    {
        path: ['TdB Chronologique', 'TdB21', 'Etude - Les Fourchettes de Kaminer'],
        title: 'TdB21-6 : S.M. Kaminer (Trud, 1935)',
        fen: '8/1p4kP/4pbpN/8/P3q3/6P1/7Q/3K4 w - - 0 1',
        url: 'https://lichess.org/study/jgWiiJt2/xRsjPjcu'
    },



    // ---------- TdB22 ----------

    {
        path: ['TdB Chronologique', 'TdB22', 'Le Clouage'],
        title: 'TdB22-1 : Bründtrup - Budrich (Berlín, 1954)',
        fen: '5k2/6p1/p2q3p/b7/2QB4/7P/P5P1/6K1 w - - 0 1',
        url: 'https://lichess.org/study/XaOMRNIC/mSCj23Qg'
    },

    {
        path: ['TdB Chronologique', 'TdB22', 'Le Clouage'],
        title: 'TdB22-2 : Kieninger - Herrmann (Bad Oeynhausen, 1940)',
        fen: '8/4kpp1/4p1p1/Q2pP1P1/2pR1P2/PrP3Pq/1P6/2K5 w - - 1 1',
        url: 'https://lichess.org/study/XaOMRNIC/vmbdoaXT'
    },

    {
        path: ['TdB Chronologique', 'TdB22', 'Le Clouage'],
        title: 'TdB22-3 : Lexandrovitch - Krummhauer (Berlin, 1951) (variante)',
        fen: 'r5k1/pb2q1p1/1p2p2p/3pNr2/3P4/8/PPQ2PPP/2R1R1K1 w - - 0 1',
        url: 'https://lichess.org/study/XaOMRNIC/QoKSyppO'
    },

    {
       path: ['TdB Chronologique', 'TdB22', 'Finales {RTP} vs {rt} - {P} en 5e et {r} devant - Défense de Philidor'],
        title: 'TdB22-4 : Danilov - Gheng (Miercurea Ciuc, 2001)',
        fen: '4k3/R7/5K2/4P2r/8/8/8/8 b - - 0 1',
        url: 'https://lichess.org/study/XaOMRNIC/lGAmgvkA'
    },

    {
        path: ['TdB Chronologique', 'TdB22', 'Finales {RTP} vs {rt} - {P} en 5e et {r} devant - Défense de Philidor'],
        title: 'TdB22-5 : Laudati - Pienabarca (Rome, 1997)',
        fen: '8/8/8/8/7r/1R3pk1/8/6K1 w - - 0 1',
        url: 'https://lichess.org/study/XaOMRNIC/NHCsVbiK'
    },

    {
        path: ['TdB Chronologique', 'TdB22', 'Etude - Les Clouages de Chéron'],
        title: 'TdB22-6 : A. Chéron (Journal de Genève, 1974)',
        fen: 'R7/5p1p/1pB3p1/5bP1/K1R5/P1Pk2r1/1p3P2/8 w - - 1 1',
        url: 'https://lichess.org/study/XaOMRNIC/8wvpGLS8'
    },



    // ---------- TdB23 ----------

    {
        path: ['TdB Chronologique', 'TdB23', 'L\'Enfilade'],
        title: 'TdB23-1 : Rivera - Fischer (1962, Varna)',
        fen: 'r4rk1/pbq2ppp/1p2pn2/n1p5/3P4/PBP1P1N1/1B3PPP/2RQ1RK1 b q - 0 1',
        url: 'https://lichess.org/study/B4rB3ELK/fZN8tFK4'
    },

    {
        path: ['TdB Chronologique', 'TdB23', 'L\'Enfilade'],
        title: 'TdB23-2 : Byrne - Tarjan (Oberlin, 1975)',
        fen: '1q4k1/4pR2/p3r1p1/6P1/8/P1P2Q2/KP6/8 w - - 0 1',
        url: 'https://lichess.org/study/B4rB3ELK/xoWCcHpy'
    },

    {
        path: ['TdB Chronologique', 'TdB23', 'L\'Enfilade'],
        title: 'TdB23-3 : Short - Vaganian (Barcelone, 1989)',
        fen: '2Q5/1pR3r1/p4k2/6p1/P2qb3/6BP/5PP1/6K1 w - - 0 1',
        url: 'https://lichess.org/study/B4rB3ELK/Ow1h32XH'
    },

    {
       path: ['TdB Chronologique', 'TdB23', 'Finales {RTP}({P}) vs {rt} - L\'Enfilade en finales de Tours'],
        title: 'TdB23-4 : Hebden - Speelman (Southend, 2000)',
        fen: '8/4k3/PR6/7r/4K3/8/8/8 w - - 0 1',
        url: 'https://lichess.org/study/B4rB3ELK/JbEcyVsw'
    },

    {
        path: ['TdB Chronologique', 'TdB23', 'Finales {RTP}({P}) vs {rt} - L\'Enfilade en finales de Tours'],
        title: 'TdB23-5 : Bernstein - Smyslov (Groningue, 1946)',
        fen: '1R6/8/8/5k2/5p2/7r/1p2K3/8 w - - 0 1',
        url: 'https://lichess.org/study/B4rB3ELK/gAPpLVz5'
    },

    {
        path: ['TdB Chronologique', 'TdB23', 'Etude - Les Enfilades de Rinck'],
        title: 'TdB23-6 : H. Rinck (Deutsche Schachzeitung, 1903)',
        fen: '6q1/6p1/2k4p/R6B/p7/8/2P3P1/2K5 w - - 0 1',
        url: 'https://lichess.org/study/B4rB3ELK/p6eiynwE'
    },



    // ---------- TdB24 ----------

    {
        path: ['TdB Chronologique', 'TdB24', 'La Déviation d\'ouverture de ligne'],
        title: 'TdB24-1 : Torre - Timman (Hambourg, 1982)',
        fen: '4r1k1/1pQ3pp/2p2p2/P3n3/6b1/6P1/1P2PP1P/1R1NqBK1 b - - 0 1',
        url: 'https://lichess.org/study/oQq5Yf6f/ZnyqiMsC'
    },

    {
        path: ['TdB Chronologique', 'TdB24', 'La Déviation d\'ouverture de ligne'],
        title: 'TdB24-2 : Timman - Tatai (Amsterdam, 1977)',
        fen: '4k3/pr2rp1p/q2pbQ2/8/2N5/6R1/P4PPP/4R1K1 w - - 0 1',
        url: 'https://lichess.org/study/oQq5Yf6f/NL0MFzy5'
    },

    {
        path: ['TdB Chronologique', 'TdB24', 'La Déviation d\'ouverture de ligne'],
        title: 'TdB24-3 : Kovačević - Timman (Bugojno, 1984)',
        fen: '2r1r1k1/p4pp1/1p1Pn1p1/6q1/P5P1/BP2Pp1P/5P2/Q1RR2K1 b - - 0 1',
        url: 'https://lichess.org/study/oQq5Yf6f/PzgSQ7cb'
    },

    {
       path: ['TdB Chronologique', 'TdB24', 'Finales {RTP} vs {rt} - {P} dans son camp - {t} coupé verticalement - La Règle des 5'],
        title: 'TdB24-4 : Timman - Tseshkovsky (Portoroz, 1979)',
        fen: '8/8/8/7r/1K1P4/6k1/4R3/8 w - - 0 1',
        url: 'https://lichess.org/study/oQq5Yf6f/lB722olm'
    },

    {
        path: ['TdB Chronologique', 'TdB24', 'Finales {RTP} vs {rt} - {P} dans son camp - {t} coupé verticalement - La Règle des 5'],
        title: 'TdB24-5 : Ostojic - Timman (Venise, 1974)',
        fen: '8/4k3/7R/3K1p1p/8/8/8/5r2 b - - 0 1',
        url: 'https://lichess.org/study/oQq5Yf6f/hFpjmFqg'
    },

    {
        path: ['TdB Chronologique', 'TdB24', 'Etude - La Der de Timman'],
        title: 'TdB24-6 : J. Timman (De Telegraaf, 2025)',
        fen: 'r3k3/1pp1p3/4K2P/8/1R4N1/8/p7/7B w q - 0 1',
        url: 'https://lichess.org/study/oQq5Yf6f/A8uHbQdY'
    },



    // ---------- TdB25 ----------

    {
        path: ['TdB Chronologique', 'TdB25', 'L\'Interception'],
        title: 'TdB25-1 : Réti - Bogolioubov (New York, 1924)',
        fen: '3r1bk1/ppq3pp/2p5/2P2Q1B/8/1P4P1/P6P/5RK1 w - - 0 1',
        url: 'https://lichess.org/study/TOpdMfob/51y3nl26'
    },

    {
        path: ['TdB Chronologique', 'TdB25', 'L\'Interception'],
        title: 'TdB25-2 : Gustafsson - Seger (Hambourg, 2001)',
        fen: '4r1k1/1n1q1pbp/6p1/p2r4/2Q5/B7/P3NPPP/2R2RK1 b - - 1 1',
        url: 'https://lichess.org/study/TOpdMfob/T5mezpSd'
    },

    {
        path: ['TdB Chronologique', 'TdB25', 'L\'Interception'],
        title: 'TdB25-3 : Turner - Howell (West Bromwich, 2004)',
        fen: '5r2/pp5r/4b1pk/2q4p/2P3P1/2Q1N3/P4P2/3R1K1R w - - 1 1',
        url: 'https://lichess.org/study/TOpdMfob/EV5sYnvY'
    },

    {
       path: ['TdB Chronologique', 'TdB25', 'Finales {RTP} vs {rt} - {P} en 5e et {r} devant - Défense de Karstedt avec {P} central'],
        title: 'TdB25-4 : Piquemal - Bourguet (France, 2004)',
        fen: '1R6/8/8/8/4p3/5k2/r7/4K3 w - - 0 1',
        url: 'https://lichess.org/study/TOpdMfob/DwF2zwGe'
    },

    {
        path: ['TdB Chronologique', 'TdB25', 'Finales {RTP} vs {rt} - {P} en 5e et {r} devant - Défense de Karstedt avec {P} central'],
        title: 'TdB25-5 : Zournatsidis - Le Roux (Patras, 2001)',
        fen: '1R6/8/8/8/4p3/5k2/r7/5K2 w - - 0 1',
        url: 'https://lichess.org/study/TOpdMfob/G4AkX0C6'
    },

    {
        path: ['TdB Chronologique', 'TdB25', 'Etude - Le Double Novotny de Troitzky'],
        title: 'TdB25-6 : A. Troitzky (Magyar Sakkvilag, 1935)',
        fen: '3k4/3p4/P2P2P1/p1p1P3/K3p3/3P3B/P3p2P/3N3b w - - 0 1',
        url: 'https://lichess.org/study/TOpdMfob/TkHdqiNB'
    },



    // ---------- TdB26 ----------

    {
        path: ['TdB Chronologique', 'TdB26', 'Le Clouage en Croix'],
        title: 'TdB26-1 : Bogatyriev - Sagoryanski (Moscou, 1947)',
        fen: '8/5p1k/6pp/8/5P2/r2R2KP/3Q2P1/6q1 b - - 0 1',
        url: 'https://lichess.org/study/pbBvlKwx/1sxiyhyV'
    },

    {
        path: ['TdB Chronologique', 'TdB26', 'Le Clouage en Croix'],
        title: 'TdB26-2 : Halosar - Poschauko (Graz, 1941)',
        fen: '1r4k1/4qppp/Q2pb3/8/8/b1P5/PP3PPP/1KB2B1R b - - 0 1',
        url: 'https://lichess.org/study/pbBvlKwx/syJWBUQA'
    },

    {
        path: ['TdB Chronologique', 'TdB26', 'Le Clouage en Croix'],
        title: 'TdB26-3 : Pidorich - Chernusov (Tjumen, 1981)',
        fen: 'r5k1/5Rpp/1bqp4/1p1bp3/1P6/1BP4P/1B2QPP1/6K1 w - - 0 1',
        url: 'https://lichess.org/study/pbBvlKwx/uP260Ey3'
    },

    {
       path: ['TdB Chronologique', 'TdB26', 'Finales {RTP} vs {rt} - {P} en 5e et {r} devant - Défense de Karstedt avec {P}-Fou'],
        title: 'TdB26-4 : Petran - Le (Budapest, 1997)',
        fen: '5k2/R7/6K1/5P2/8/8/8/1r6 b - - 0 1',
        url: 'https://lichess.org/study/pbBvlKwx/g1OnoDb6'
    },

    {
        path: ['TdB Chronologique', 'TdB26', 'Finales {RTP} vs {rt} - {P} en 5e et {r} devant - Défense de Karstedt avec {P}-Fou'],
        title: 'TdB26-5 : Gebhardt - Bogdanovich (Baden, 2010)',
        fen: '8/2P5/R7/5p2/p7/5k2/7K/2r5 b - - 0 1',
        url: 'https://lichess.org/study/pbBvlKwx/rgmTpizS'
    },

    {
        path: ['TdB Chronologique', 'TdB26', 'Etude - Le Double Clouage en Croix de Troitzky'],
        title: 'TdB26-6 : A. Troitzky (L\'Echiquier, 1930)',
        fen: '1q6/2b2p1p/7k/8/1p1Q4/8/1K3B2/8 w - - 0 1',
        url: 'https://lichess.org/study/pbBvlKwx/Jx4gMz9o'
    },



    // ---------- TdB27 ----------

    {
        path: ['TdB Chronologique', 'TdB27', 'L\'Attaque à la Découverte'],
        title: 'TdB27-1 : Réti - Tartakover (Vienne, 1910)',
        fen: 'rnb1kb1r/pp3ppp/2p5/4q3/4n3/3Q4/PPPB1PPP/2KR1BNR w kq - 0 1',
        url: 'https://lichess.org/study/JxGoy3cj/16P1PIK2'
    },

    {
        path: ['TdB Chronologique', 'TdB27', 'L\'Attaque à la Découverte'],
        title: 'TdB27-2 : Ed. Lasker - Thomas (Londres, 1912)',
        fen: 'rn3rk1/pbppq1pp/1p2pb2/4N2Q/3PN3/3B4/PPP2PPP/R3K2R w KQ - 0 1',
        url: 'https://lichess.org/study/JxGoy3cj/sxjsmqur'
    },

    {
        path: ['TdB Chronologique', 'TdB27', 'L\'Attaque à la Découverte'],
        title: 'TdB27-3 : Anand - Lautier (Bienne, 1997)',
        fen: '3rk2r/pR3p1p/2p1p2p/3n4/3q2P1/3BRP2/P1P2Kb1/2BQ4 w - - 0 1',
        url: 'https://lichess.org/study/JxGoy3cj/fhCoGxZv'
    },

    {
       path: ['TdB Chronologique', 'TdB27', 'Finales {RPP} vs {rp} - ({P}/{p})-Tour bloqués et {P} passé - Les Règles de Bähr'],
        title: 'TdB27-4 : Laskiewicz - Framberk (Chrudim, 2002)',
        fen: '8/8/5k2/p7/P4PK1/8/8/8 w - - 0 1',
        url: 'https://lichess.org/study/JxGoy3cj/M7fgBwRG'
    },

    {
        path: ['TdB Chronologique', 'TdB27', 'Finales {RPP} vs {rp} - ({P}/{p})-Tour bloqués et {P} passé - Les Règles de Bähr'],
        title: 'TdB27-5 : Manatakis - Niarhos (La Canée, 2003)',
        fen: '8/8/p5rk/6R1/P4K1P/8/8/8 b - - 0 1',
        url: 'https://lichess.org/study/JxGoy3cj/pjTBHmzK'
    },

    {
        path: ['TdB Chronologique', 'TdB27', 'Etude - Le Dilemme de Bähr'],
        title: 'TdB27-6 : W. Bähr (Der Alemanne, 1935)',
        fen: '8/4k3/p7/P6p/7P/5K2/8/8 w - - 0 1',
        url: 'https://lichess.org/study/JxGoy3cj/Y30JRuQa'
    },



    // ---------- TdB28 ----------

    {
        path: ['TdB Chronologique', 'TdB28', 'L\'Attaque aux Rayons-X'],
        title: 'TdB28-1 : Frit - Moreau (Ste Foy d\'Aigrefeuille, 2026)',
        fen: '2r5/2Pk4/pBR1p3/P3P3/3p4/2bK4/8/8 w - - 0 1',
        url: 'https://lichess.org/study/P8VvH1zm/M5L5jWeZ'
    },

    {
        path: ['TdB Chronologique', 'TdB28', 'L\'Attaque aux Rayons-X'],
        title: 'TdB28-2 : Tisdall - J. Polgar (Reykjavik, 1988)',
        fen: 'k7/1p1q1pp1/p2p4/P2Pn1P1/4R2r/5N2/KPP1Q1R1/7r b - - 1 1',
        url: 'https://lichess.org/study/P8VvH1zm/eX5XFfMg'
    },

    {
        path: ['TdB Chronologique', 'TdB28', 'L\'Attaque aux Rayons-X'],
        title: 'TdB28-3 : Rakolta - Janoczy (Tchécoslovaquie, 1978)',
        fen: 'k7/p1p1p3/2P5/8/3rR3/8/PP2Qq2/K7 w - - 0 1',
        url: 'https://lichess.org/study/P8VvH1zm/rmm1ftwi'
    },

    {
       path: ['TdB Chronologique', 'TdB28', 'Finales {RTP} vs {rt} - {P} en 7e et {R} devant - {r} coupé verticalement - Défense Latérale et Règle de Ste Foy'],
        title: 'TdB28-4 : Arat - Özen (Izmir, 2017)',
        fen: '5r2/8/8/8/8/8/R3p1K1/4k3 w - - 0 1',
        url: 'https://lichess.org/study/P8VvH1zm/GsGBjEta'
    },

    {
        path: ['TdB Chronologique', 'TdB28', 'Finales {RTP} vs {rt} - {P} en 7e et {R} devant - {r} coupé verticalement - Défense Latérale et Règle de Ste Foy'],
        title: 'TdB28-5 : Heinz - Müller (Fürth, 1999)',
        fen: '4KR2/r3P1k1/8/8/8/8/8/8 w - - 2 2',
        url: 'https://lichess.org/study/P8VvH1zm/anpKrQd7'
    },

    {
        path: ['TdB Chronologique', 'TdB28', 'Etude - L\'Escalier de Kopaïev'],
        title: 'TdB28-6 : N.A. Kopaiev (Shakhmaty v SSSR, 1953)',
        fen: '5K1k/5P2/8/8/8/8/2r5/6R1 b - - 0 1',
        url: 'https://lichess.org/study/P8VvH1zm/EipLm1Qq'
    },



    // ---------- TdB29 ----------

    {
        path: ['TdB Chronologique', 'TdB29', 'Combinaisons de Philidor'],
        title: 'TdB29-1 : von Brühl - Philidor (Londres, 1783)',
        fen: '3R4/5k2/3P3P/8/5p2/4p2P/3r4/5K2 b - - 0 1',
        url: 'https://lichess.org/study/yt4sMM6g/MJ9ozOa5'
    },

    {
        path: ['TdB Chronologique', 'TdB29', 'Combinaisons de Philidor'],
        title: 'TdB29-2 : Philidor - von Brühl (Londres, 1788)',
        fen: '2b1k3/5r2/4pBpP/3pP1P1/2pP2BK/1pP5/1P6/8 w - - 0 1',
        url: 'https://lichess.org/study/yt4sMM6g/Wv4flRhe'
    },

    {
        path: ['TdB Chronologique', 'TdB29', 'Combinaisons de Philidor'],
        title: 'TdB29-3 : Philidor - von Brühl (Londres, 1789)',
        fen: 'r2n1rbk/1p1qn1pp/pb2p3/3pP2P/1P1P1PP1/P3BNK1/R7/1B1Q3R w - - 0 1',
        url: 'https://lichess.org/study/yt4sMM6g/vy3VUsea'
    },

    {
       path: ['TdB Chronologique', 'TdB29', 'Finales de Pions - Cases minées de Philidor'],
        title: 'TdB29-4 : F.A.D. Philidor (Analyse du Jeu des Echecs, 1777)',
        fen: '8/8/4p3/2p2k2/2P1p1p1/6P1/5K2/8 w - - 0 1',
        url: 'https://lichess.org/study/yt4sMM6g/DwMOq9yg'
    },

    {
        path: ['TdB Chronologique', 'TdB29', 'Etude - La Position de Philidor en finale {D} vs {t}'],
        title: 'TdB29-5 : F.A.D. Philidor (Analyse du Jeu des Echecs, 1777)',
        fen: '1k6/1r6/2K5/Q7/8/8/8/8 w - - 0 1',
        url: 'https://lichess.org/study/yt4sMM6g/CmsXcnuv'
    },

    {
        path: ['TdB Chronologique', 'TdB29', 'Etude - La Position de Philidor en finale {TF} vs {t}'],
        title: 'TdB29-6 : F.A.D. Philidor (Analyse du Jeu des Echecs, 1749)',
        fen: '3k4/4r3/3K4/3B4/8/8/8/5R2 w - - 0 1',
        url: 'https://lichess.org/study/yt4sMM6g/IHfXzHFB'
    },

    {
        path: ['TdB Chronologique', 'TdB29', 'Combinaisons contre la Défense Philidor'],
        title: 'TdB29-7 : Morphy - Duc de Brunswick & Comte Isouard (Paris, 1858)',
        fen: '3rkb1r/p2nqppp/5n2/1B2p1B1/4P3/1Q6/PPP2PPP/2KR3R w k - 3 13',
        url: 'https://lichess.org/study/yt4sMM6g/sgkQFtIR#28'
    },

    {
        path: ['TdB Chronologique', 'TdB29', 'Combinaisons contre la Défense Philidor'],
        title: 'TdB29-8 : van der Wiel - van Baarle (Amsterdam, 1983)',
        fen: 'r1bqk2r/pp1nbppp/2p4n/4p1N1/2B1P3/8/PPP2PPP/RNBQ1RK1 w kq - 4 8',
        url: 'https://lichess.org/study/yt4sMM6g/8n15GBJA#14'
    },

    {
        path: ['TdB Chronologique', 'TdB29', 'Combinaisons contre la Défense Philidor'],
        title: 'TdB29-9 : E. Adams - C. Torre (Nouvelle Orléans, 1920)',
        fen: '2r1r1k1/1p1q1ppp/3p1b2/p2P4/3Q4/5N2/PP2RPPP/4R1K1 w - - 0 18',
        url: 'https://lichess.org/study/yt4sMM6g/FjB3TuKk#34'
    },








    // ---------- TdB Thématique ----------
    
    // ---------- TACTIQUE ----------
    // --------------- Tableaux de Mat ----------
      // ------------------- Mat avec Pièces Lourdes ----------

    {
        path: ['TdB Thématique', 'TACTIQUE', 'Tableaux de Mat', 'Mat avec Pièces Lourdes', 'Mat de l\'Escalier'],
        title: 'TdB1-6 : A. Mouterde (La Stratégie, 1922)',
        fen: '3kr2q/6Q1/8/8/8/4R3/8/K7 w - - 0 1',
        url: 'https://lichess.org/study/KODwkcmn/bc7SQG59',
        marks: 'arrow:rouge:h8>a1 piece=Rw:bleu:c3 piece=Qw:bleu:b2'
    },


     {
        path: ['TdB Thématique', 'TACTIQUE', 'Tableaux de Mat', 'Mat avec Pièces Lourdes','Mat des Cochons Aveugles'],
        title: 'TdB12-1 : Swiderski - Nimzovitsch (Barmen, 1905)',
        fen: 'r4rk1/2R2p2/1n2N1pp/2Rp4/p2P4/P3P1QP/qP3PPK/8 w - - 0 1',
        url: 'https://lichess.org/study/OsXJ1z73/ilvOJMj8'
    },

     {
        path: ['TdB Thématique', 'TACTIQUE', 'Tableaux de Mat', 'Mat avec Pièces Lourdes','Mat des Cochons Aveugles'],
        title: 'TdB12-2 : Ivanchuk - Aronian (Morelia-Linares, 2006)',
        fen: '5rk1/1R1R1p1p/6p1/p1N1p3/5P2/1P4P1/r2nP1KP/8 w - - 0 1',
        url: 'https://lichess.org/study/OsXJ1z73/VKtfAVv4'
    },

     {
        path: ['TdB Thématique', 'TACTIQUE', 'Tableaux de Mat', 'Mat avec Pièces Lourdes','Mat des Cochons Aveugles'],
        title: 'TdB12-3 : Alekhine - Yates (Londres, 1922)',
        fen: 'r5r1/2R2Rpk/b3p2p/3pNp1P/p2P1K2/Pp2PPP1/1P6/8 w - - 0 1',
        url: 'https://lichess.org/study/OsXJ1z73/plo5AYtG'
    },


     {
        path: ['TdB Thématique', 'TACTIQUE', 'Tableaux de Mat', 'Mat avec Pièces Lourdes','Mat du Couloir'],
        title: 'TdB1-1 : Fuster - Balogh (Budapest, 1945)',
        fen: '5rk1/5ppp/8/8/8/4PQ2/r1q2PPP/RR4K1 b - - 0 1',
        url: 'https://lichess.org/study/KODwkcmn/wtBVuyy5',
        marks: 'arrow:vert:c2>b2'

    },

     {
        path: ['TdB Thématique', 'TACTIQUE', 'Tableaux de Mat', 'Mat avec Pièces Lourdes','Mat du Couloir'],
        title: 'TdB1-2 : Rovner - Kamishov (Moscou, 1947)',
        fen: '1r1r2k1/2q2ppp/p3b3/4p3/1p2P3/5B2/PPPR1QPP/3R3K w - - 0 1',
        url: 'https://lichess.org/study/KODwkcmn/37ww0B5X',
        marks: 'arrow:vert:f2>a7'
    },

     {
        path: ['TdB Thématique', 'TACTIQUE', 'Tableaux de Mat', 'Mat avec Pièces Lourdes','Mat du Couloir'],
        title: 'TdB1-3 : Teschner - Portisch (Monte Carlo, 1969)',
        fen: 'k1r1r3/pp5p/1q6/3R1Np1/1b6/1P3P2/2Q1R1PP/7K b - - 0 1',
        url: 'https://lichess.org/study/KODwkcmn/JbRkXQlQ',
        marks: 'arrow:vert:b6>f2'
    },


     {
        path: ['TdB Thématique', 'TACTIQUE', 'Tableaux de Mat', 'Mat avec Pièces Lourdes','Mat des Epaulettes'],
        title: 'TdB7-1 : van Wely - Morozevich (Wijk aan Zee, 2001)',
        fen: '1k1r4/pp1q1B1p/3bQp2/2p2r2/P6P/2BnP3/1P6/5RKR b - - 25 1',
        url: 'https://lichess.org/study/j6Q6uKTU/nMcJLSgg'
    },

     {
        path: ['TdB Thématique', 'TACTIQUE', 'Tableaux de Mat', 'Mat avec Pièces Lourdes','Mat des Epaulettes'],
        title: 'TdB7-2 : Safarli - Rodshtein (Ile de Man, 2019)',
        fen: '5rkr/pp3p1p/2nq2pQ/3p1RN1/3P4/2P5/PP4PP/4R1K1 w - - 1 1',
        url: 'https://lichess.org/study/j6Q6uKTU/bBmqpw1z'
    },

     {
        path: ['TdB Thématique', 'TACTIQUE', 'Tableaux de Mat', 'Mat avec Pièces Lourdes','Mat des Epaulettes'],
        title: 'TdB7-3 : Steinitz - NN (1861)',
        fen: 'r1q3kr/1p4p1/p1p2R1p/5p2/6PP/P3Q3/1P4P1/3R3K w - - 1 1',
        url: 'https://lichess.org/study/j6Q6uKTU/FoAKWAQu'
    },


     {
        path: ['TdB Thématique', 'TACTIQUE', 'Tableaux de Mat', 'Mat avec Pièces Lourdes','Mat du Guéridon'],
        title: 'TdB8-1 : Tallantare - Ladelell (Newcastle, 1893)',
        fen: '5r1r/p3P1kp/1p4pq/4p3/2B5/8/P4QPP/6K1 w - - 0 1',
        url: 'https://lichess.org/study/Iofs72fq/xEl9C7dl'
    },

     {
        path: ['TdB Thématique', 'TACTIQUE', 'Tableaux de Mat', 'Mat avec Pièces Lourdes','Mat du Guéridon'],
        title: 'TdB8-2 : von Holzhausen - Tarrasch (Francfort, 1912)',
        fen: 'r1bqr1k1/pppnbppp/2np4/8/2BNP3/2N4P/PPP2PP1/R1BQR1K1 w Qq - 0 1',
        url: 'https://lichess.org/study/Iofs72fq/p2B5CNpn'
    },

     {
        path: ['TdB Thématique', 'TACTIQUE', 'Tableaux de Mat', 'Mat avec Pièces Lourdes','Mat du Guéridon'],
        title: 'TdB8-3 : Pokojowczyk - Timochtchenko (Polanica-Zdroj, 1979)',
        fen: '4r1k1/5ppp/p2p1b1P/3P1bP1/1Q3P2/1P3K2/1P1R2R1/6Bq b - - 3 1',
        url: 'https://lichess.org/study/Iofs72fq/DgUNazRP'
    },


     {
        path: ['TdB Thématique', 'TACTIQUE', 'Tableaux de Mat', 'Mat avec Pièces Lourdes','Mat de Cozio'],
        title: 'TdB9-1 : Tasic - Dorfman (Nice, 1993)',
        fen: '2q5/1r2Bp1k/4pQpN/1pp1P2p/2p5/6P1/1P2PPKP/3r4 w - - 7 1',
        url: 'https://lichess.org/study/p2znRfiY/KPNmxRf1'
    },

     {
        path: ['TdB Thématique', 'TACTIQUE', 'Tableaux de Mat', 'Mat avec Pièces Lourdes','Mat de Cozio'],
        title: 'TdB9-2 : Luo - Ismagambetov (Kuala Lumpur, 2002)',
        fen: '2r5/4k1pp/p2p4/BpnPp3/4q3/5Q2/PP1K1bPP/3R1R2 b - - 5 1',
        url: 'https://lichess.org/study/p2znRfiY/SUNgMOYf'
    },

     {
        path: ['TdB Thématique', 'TACTIQUE', 'Tableaux de Mat', 'Mat avec Pièces Lourdes','Mat de Cozio'],
        title: 'TdB9-3 : Bellon Lopez - Smejkal (Siegen, 1970)',
        fen: '5rk1/1p1b3p/2pp2p1/p7/2Pb2Pq/1P1PpP2/P1N1K1RP/1RQ5 b - - 4 1',
        url: 'https://lichess.org/study/p2znRfiY/o2aohwIU'
    },


     {
        path: ['TdB Thématique', 'TACTIQUE', 'Tableaux de Mat', 'Mat avec Pièces Lourdes','Mat de Lolli'],
        title: 'TdB16-1 : Hoogendoorn - Günther (Nimègue, 1992)',
        fen: '1r3rk1/5ppp/p4P2/2pP4/2n1p3/1q6/1P1QB1PP/1R3RK1 w - - 0 1',
        url: 'https://lichess.org/study/7uiPAONy/GItCM4eN'
    },

     {
        path: ['TdB Thématique', 'TACTIQUE', 'Tableaux de Mat', 'Mat avec Pièces Lourdes','Mat de Lolli'],
        title: 'TdB16-2 : Bors - Szeberenyi (Hongrie, 2001)',
        fen: '2b1r1k1/pp3p1p/2p2Pp1/4P3/1qPR1Q2/6PP/6BK/8 w - - 0 1',
        url: 'https://lichess.org/study/7uiPAONy/3zgYG2kU'
    },

     {
        path: ['TdB Thématique', 'TACTIQUE', 'Tableaux de Mat', 'Mat avec Pièces Lourdes','Mat de Lolli'],
        title: 'TdB16-3 : Menchik - Thomas (Londres, 1932)',
        fen: 'r4r2/q1pb1pkp/1p1p2p1/2nPpP1P/2P1P3/p1N2P2/PP1Q4/2KR1BR1 w - - 0 1',
        url: 'https://lichess.org/study/7uiPAONy/xNCmEN7n'
    },


     {
        path: ['TdB Thématique', 'TACTIQUE', 'Tableaux de Mat', 'Mat avec Pièces Lourdes','Mat de Damiano'],
        title: 'TdB15-1 : Model - Goldberg (Leningrad, 1932)',
        fen: '2r2k1r/pB3pp1/4p3/Q1p1P3/3P2p1/2P1q3/PP3RP1/R5K1 b Qk - 0 1',
        url: 'https://lichess.org/study/8i2iG3Uj/xdwWxE1f'
    },

     {
        path: ['TdB Thématique', 'TACTIQUE', 'Tableaux de Mat', 'Mat avec Pièces Lourdes','Mat de Damiano'],
        title: 'TdB15-2 : NN - NN (Rapide, Chandler 1998, How to beat your Dad at Chess)',
        fen: 'k1rq3r/p1p2p2/1p2p1p1/P2pPn2/2nP1P1p/1NP5/2PBQ1PP/RR5K b Qk - 0 1',
        url: 'https://lichess.org/study/8i2iG3Uj/QYhH4oQp'
    },

     {
        path: ['TdB Thématique', 'TACTIQUE', 'Tableaux de Mat', 'Mat avec Pièces Lourdes','Mat de Damiano'],
        title: 'TdB15-3 : Baburine - Adianto (Liechtenstein, 1993)',
        fen: 'q1r1k2r/1b3pp1/p3p3/P1b4n/1pN1P2p/3BBP2/1P2Q1PP/R4R1K b Qk - 0 1',
        url: 'https://lichess.org/study/8i2iG3Uj/YBQQ9Rpt'
    },


    
   
      // ------------------- Mat avec Pièce Lourde + Pièce Mineure ----------


     {
        path: ['TdB Thématique', 'TACTIQUE', 'Tableaux de Mat', 'Mat avec Pièce Lourde + Pièce Mineure','Mat de Balestra'],
        title: 'TdB19-1 : Kotronias - Arlandi (Yerevan, 1996)',
        fen: '7r/p3Q3/4p1k1/2p1Pb1p/8/2B2P2/rP3K2/8 w - - 4 1',
        url: 'https://lichess.org/study/NbcTHbc2/yUI2QnNm'
    },

     {
        path: ['TdB Thématique', 'TACTIQUE', 'Tableaux de Mat', 'Mat avec Pièce Lourde + Pièce Mineure','Mat de Balestra'],
        title: 'TdB19-2 : Yanofsky - Reshevsky (Dallas, 1957)',
        fen: '8/3kP3/3b1Qp1/1q4B1/6P1/2p5/5P2/6K1 w - - 0 1',
        url: 'https://lichess.org/study/NbcTHbc2/CIm5iLqA'
    },

     {
        path: ['TdB Thématique', 'TACTIQUE', 'Tableaux de Mat', 'Mat avec Pièce Lourde + Pièce Mineure','Mat de Balestra'],
        title: 'TdB19-3 : Millet - Franciskovic (Hersonissos, 2017)',
        fen: '3qr3/1p1k3b/2n1p2P/1NQpP1p1/1p4P1/5P2/1P2BK2/7R w - - 0 1',
        url: 'https://lichess.org/study/NbcTHbc2/upqLdl33'
    },


     {
        path: ['TdB Thématique', 'TACTIQUE', 'Tableaux de Mat', 'Mat avec Pièce Lourde + Pièce Mineure','Mat de l\'Opéra'],
        title: 'TdB6-1 : van Vliet - Passmore (Londres, 1900)',
        fen: '4r1k1/p3bp1p/1p4p1/3q1p2/8/1P2PR1Q/PBr3PP/R5K1 w Q - 0 1',
        url: 'https://lichess.org/study/pPDqTYSi/bh2xEaDC',
        marks: 'arrow:vert:b5>b6 piece=Qb:rouge:a1 arrow:bleu:h8>g8,g8>e8,e8>e5,e5>h8 piece=Qw:bleu:h8'
    },

     {
        path: ['TdB Thématique', 'TACTIQUE', 'Tableaux de Mat', 'Mat avec Pièce Lourde + Pièce Mineure','Mat de l\'Opéra'],
        title: 'TdB6-2 : Muellneritsch - Eichert (Raika, 1999)',
        fen: 'r5kr/p1q2p2/bpn1p1p1/3pP1BQ/3P4/b1PB1R2/P4PPP/R5K1 w Q - 0 1',
        url: 'https://lichess.org/study/pPDqTYSi/UbmCRBz1',
        marks: 'arrow:vert:h5>h8 arrow:bleu:f3>h3 arrow:jaune:g5>f6'
    },

     {
        path: ['TdB Thématique', 'TACTIQUE', 'Tableaux de Mat', 'Mat avec Pièce Lourde + Pièce Mineure','Mat de l\'Opéra'],
        title: 'TdB6-3 : Belenky - Pirogov (Moscou, 1975)',
        fen: '3rr1k1/1bp2ppp/p7/1p1q4/3P1B2/2P3P1/PP5K/RN1Q2R1 b - - 0 1',
        url: 'https://lichess.org/study/pPDqTYSi/JSY54Jzn',
        marks: 'arrow:rouge:d5>g2,d5>h5 arrow:vert:e8>e1 arrow:rouge:e1>g1'
    },


     {
        path: ['TdB Thématique', 'TACTIQUE', 'Tableaux de Mat', 'Mat avec Pièce Lourde + Pièce Mineure','Mat de Greco'],
        title: 'TdB13-1 : Johnston - Marshall (Chicago, 1899)',
        fen: 'r2q1rk1/pbp3pp/1p1b4/3N1p2/2B5/P3PPn1/1P3P1P/2RQK2R w - - 0 1',
        url: 'https://lichess.org/study/9u4n3THl/LQr63QnQ'
    },

     {
        path: ['TdB Thématique', 'TACTIQUE', 'Tableaux de Mat', 'Mat avec Pièce Lourde + Pièce Mineure','Mat de Greco'],
        title: 'TdB13-2 : Nimzowitsch - Capablanca (San Sebastian, 1911)',
        fen: '5r1k/p3n1pp/1p6/1PP2p2/P2Pn3/3b1Bb1/1B4P1/R1R4K b - - 0 1',
        url: 'https://lichess.org/study/9u4n3THl/wMgtdSeC'
    },

     {
        path: ['TdB Thématique', 'TACTIQUE', 'Tableaux de Mat', 'Mat avec Pièce Lourde + Pièce Mineure','Mat de Greco'],
        title: 'TdB13-3 : Aleksandrov - Zaitsev (URSS, 1973)',
        fen: '2k1r2r/ppn3pq/b7/5p2/5Qn1/2N1B1P1/1P3PB1/2RR2K1 w - - 0 1',
        url: 'https://lichess.org/study/9u4n3THl/OPsEJ6WE'
    },


     {
        path: ['TdB Thématique', 'TACTIQUE', 'Tableaux de Mat', 'Mat avec Pièce Lourde + Pièce Mineure','Mat de Pillsbury'],
        title: 'TdB18-1 : Stepanow - NN (Riga, 1899)',
        fen: 'r2q1rk1/ppp2ppp/2np4/8/4P3/P2n1P1P/1BB2P1K/R5R1 w - - 0 1',
        url: 'https://lichess.org/study/jXpZv9Ui/KBMDWmH7'
    },

     {
        path: ['TdB Thématique', 'TACTIQUE', 'Tableaux de Mat', 'Mat avec Pièce Lourde + Pièce Mineure','Mat de Pillsbury'],
        title: 'TdB18-2 : Savic - Radojevic (Herceg Novi, 2006)',
        fen: '5rk1/prp2p1p/4n2B/7p/1qBPP2P/1P3P2/P2Q1P2/1K5R w - - 0 1',
        url: 'https://lichess.org/study/jXpZv9Ui/1ngftN9p'
    },

     {
        path: ['TdB Thématique', 'TACTIQUE', 'Tableaux de Mat', 'Mat avec Pièce Lourde + Pièce Mineure','Mat de Pillsbury'],
        title: 'TdB18-3 : Pillsbury - Newman (Philadelphie, 1900)',
        fen: '5rk1/prpn1p1p/1p3p1B/8/3P4/4P3/PP3PqP/R2QK2R w - - 0 1',
        url: 'https://lichess.org/study/jXpZv9Ui/t9g61Uvc'
    },


     {
        path: ['TdB Thématique', 'TACTIQUE', 'Tableaux de Mat', 'Mat avec Pièce Lourde + Pièce Mineure','Mat de Morphy'],
        title: 'TdB17-1 : Palmer - Moody (Cadillac USA, 2019)',
        fen: '4r2k/1p3p1p/p2r4/6B1/P1bp2R1/2N5/1P5P/6RK w - - 0 1',
        url: 'https://lichess.org/study/ZKYpuooK/MV8EdMMd'
    },

     {
        path: ['TdB Thématique', 'TACTIQUE', 'Tableaux de Mat', 'Mat avec Pièce Lourde + Pièce Mineure','Mat de Morphy'],
        title: 'TdB17-2 : Reshevsky - Shainswit (New York, 1951)',
        fen: '2r2rk1/5ppp/pp6/2q5/2P1pP2/3QPRnP/P5P1/B1R3K1 w - - 0 1',
        url: 'https://lichess.org/study/ZKYpuooK/TGYSW7oS'
    },

     {
        path: ['TdB Thématique', 'TACTIQUE', 'Tableaux de Mat', 'Mat avec Pièce Lourde + Pièce Mineure','Mat de Morphy'],
        title: 'TdB17-3 : Nimzowitsch - Nielsen (Copenhague, 1930)',
        fen: '3r1rk1/p2R1ppp/1p1bp3/3qB3/3PR3/5Q1P/PP3PP1/6K1 w - - 0 1',
        url: 'https://lichess.org/study/ZKYpuooK/hEWSwgf5'
    },


     {
        path: ['TdB Thématique', 'TACTIQUE', 'Tableaux de Mat', 'Mat avec Pièce Lourde + Pièce Mineure','Mat Arabe'],
        title: 'TdB4-1 : Andriasian - Burg (Groningue, 2021)',
        fen: 'r4nk1/pp2r1p1/2p1P2p/3p1P1N/8/8/PPPK4/6RR w - - 0 1',
        url: 'https://lichess.org/study/VdTzW3uu/71tLoVpO',
        marks: 'arrow:bleu:h1>h6 arrow:rouge:g1>g8 arrow:vert:h5>f6'
    },

     {
        path: ['TdB Thématique', 'TACTIQUE', 'Tableaux de Mat', 'Mat avec Pièce Lourde + Pièce Mineure','Mat Arabe'],
        title: 'TdB4-2 : Anderssen - Schallopp (Berlin, 1864)',
        fen: '6k1/3R2pp/8/6r1/3n1p2/1P3P1K/P1r3P1/4R3 b - - 0 1',
        url: 'https://lichess.org/study/VdTzW3uu/cLVTqiCw',
        marks: 'arrow:vert:g5>g3 arrow:bleu:d4>f3'
    },

     {
        path: ['TdB Thématique', 'TACTIQUE', 'Tableaux de Mat', 'Mat avec Pièce Lourde + Pièce Mineure','Mat Arabe'],
        title: 'TdB4-3 : Gelfand - Kramnik (Berlin, 1996)',
        fen: '1r4k1/p5pp/4q3/2Q2pP1/3N4/Prn1P3/1P1B1P1P/KR6 b - - 0 1',
        url: 'https://lichess.org/study/VdTzW3uu/k56pN4cw',
        marks: 'arrow:vert:b3>b2'
    },


     {
        path: ['TdB Thématique', 'TACTIQUE', 'Tableaux de Mat', 'Mat avec Pièce Lourde + Pièce Mineure','Mat de l\'Hameçon'],
        title: 'TdB11-1 : Kazhgaleiev - J. Polgar (Calatrava, 2007)',
        fen: '1r4k1/2R5/3p4/3P2B1/p1p4p/2b2RnP/P5P1/6K1 b - - 0 1',
        url: 'https://lichess.org/study/qwVCWJlT/jBquYGQq'
    },

     {
        path: ['TdB Thématique', 'TACTIQUE', 'Tableaux de Mat', 'Mat avec Pièce Lourde + Pièce Mineure','Mat de l\'Hameçon'],
        title: 'TdB11-2 : Gagunashvili - Kalegin (Moscou, 2006)',
        fen: '1Qb5/5pk1/6p1/3N2P1/7p/p6P/6BK/2q5 w - - 0 1',
        url: 'https://lichess.org/study/qwVCWJlT/kbXsRtAF'
    },

     {
        path: ['TdB Thématique', 'TACTIQUE', 'Tableaux de Mat', 'Mat avec Pièce Lourde + Pièce Mineure','Mat de l\'Hameçon'],
        title: 'TdB11-3 : Bulmaga - Kashlinskaya (Kharkov, 2007)',
        fen: '6kr/3b3r/2p2p2/1p1q1P2/p2p2pN/3P4/PPP1RKPQ/7R w - - 0 1',
        url: 'https://lichess.org/study/qwVCWJlT/J3QV4bHl'
    },


     {
        path: ['TdB Thématique', 'TACTIQUE', 'Tableaux de Mat', 'Mat avec Pièce Lourde + Pièce Mineure','Mat de Vukovic'],
        title: 'TdB10-1 : Torre - Ljubojevic (Manille, 1976)',
        fen: '6k1/1R6/8/3NKN1p/1P2p3/2P2r2/5r2/8 w - - 0 1',
        url: 'https://lichess.org/study/5ftHnQkJ/34RxMTkm'
    },

     {
        path: ['TdB Thématique', 'TACTIQUE', 'Tableaux de Mat', 'Mat avec Pièce Lourde + Pièce Mineure','Mat de Vukovic'],
        title: 'TdB10-2 : Spassky - Larsen (Malmö, 1968)',
        fen: '3r1k2/1R6/5N2/p2PP1K1/8/7P/5p2/3b4 w - - 0 1',
        url: 'https://lichess.org/study/5ftHnQkJ/3o61MX3J'
    },

     {
        path: ['TdB Thématique', 'TACTIQUE', 'Tableaux de Mat', 'Mat avec Pièce Lourde + Pièce Mineure','Mat de Vukovic'],
        title: 'TdB10-3 : Schiller - Redman (Chicago, 1975)',
        fen: '4Qbr1/2q4p/knNp4/3P1p2/P1p5/2P3P1/5P1P/1R4K1 w - - 0 1',
        url: 'https://lichess.org/study/5ftHnQkJ/hrQ2Yx34'
    },


     {
        path: ['TdB Thématique', 'TACTIQUE', 'Tableaux de Mat', 'Mat avec Pièce Lourde + Pièce Mineure','Mat d\'Anastasia'],
        title: 'TdB3-1 : Bayer - Falkbeer (Vienne, 1852)',
        fen: 'Q7/p1p1k1pp/1b6/7q/3n1r2/8/P4PPP/RN3RK1 b - - 0 1',
        url: 'https://lichess.org/study/uMLLix2a/SiI0vvuq',
        marks: 'arrow:vert:d4>e2 arrow:bleu:h5>h2'
    },

     {
        path: ['TdB Thématique', 'TACTIQUE', 'Tableaux de Mat', 'Mat avec Pièce Lourde + Pièce Mineure','Mat d\'Anastasia'],
        title: 'TdB3-2 : Kamyshov - Sokolski (Leningrad, 1936)',
        fen: '6k1/p4p1p/3p1p2/2p1r3/2PnrqN1/P6P/1P1Q1PP1/3R1RK1 b - - 0 1',
        url: 'https://lichess.org/study/uMLLix2a/yrosHTOM',
        marks: 'arrow:bleu:f4>g4 arrow:vert:d4>e2'
    },

     {
        path: ['TdB Thématique', 'TACTIQUE', 'Tableaux de Mat', 'Mat avec Pièce Lourde + Pièce Mineure','Mat d\'Anastasia'],
        title: 'TdB3-3 : Vidmar - Euwe (Karlsbad, 1929)',
        fen: '6k1/5pb1/1p1N3p/p5p1/5q2/Q6P/PPr5/3RR1K1 w - - 0 1',
        url: 'https://lichess.org/study/uMLLix2a/rJ6OeYwu',
        marks: 'arrow:vert:e1>e8'
    },


      // ------------------- Mat avec Pièces Mineures ----------

     {
        path: ['TdB Thématique', 'TACTIQUE', 'Tableaux de Mat', 'Mat avec Pièces Mineures','Mat de Blackburne'],
        title: 'TdB20-1 : Stefánsson - Bruzón Batista (La Havane, 2001)',
        fen: '2q1rrk1/1b1pb2p/p3p1p1/1p2B1Nn/4BP2/PP6/2P1Q1PP/R4R1K w - - 0 1',
        url: 'https://lichess.org/study/T8YLWdU5/DkrmC5LZ'
    },

     {
        path: ['TdB Thématique', 'TACTIQUE', 'Tableaux de Mat', 'Mat avec Pièces Mineures','Mat de Blackburne'],
        title: 'TdB20-2 : Flohr - Pitschak (Bilina, 1930)',
        fen: 'r2r2k1/pb3ppp/1p1bpn2/7q/3n4/1P1B2P1/PB1N1P1P/RQ2NRK1 b - - 0 1',
        url: 'https://lichess.org/study/T8YLWdU5/ePGntR2f'
    },

     {
        path: ['TdB Thématique', 'TACTIQUE', 'Tableaux de Mat', 'Mat avec Pièces Mineures','Mat de Blackburne'],
        title: 'TdB20-3 : Olesen - Buehl (Dearborn, 1992)',
        fen: '3b1rk1/p1q2p1p/bp2p1p1/2p2nNn/2P3N1/7Q/PB3PPP/1BR3K1 w - - 0 1',
        url: 'https://lichess.org/study/T8YLWdU5/ajDRJ3iv'
    },


     {
        path: ['TdB Thématique', 'TACTIQUE', 'Tableaux de Mat', 'Mat avec Pièces Mineures','Mat de Boden'],
        title: 'TdB2-1 : Ed. Lasker - Englund (Scheveningue 1913)',
        fen: '2kr1b1r/pp3ppp/2p1b2q/4B3/4Q3/2PB2R1/PPP2PPP/3R2K1 w - - 0 1',
        url: 'https://lichess.org/study/jtsBgg9o/5nz9Jtqn',
        marks: 'arrow:vert:e4>c6 arrow:rouge:d3>a6'
    },

     {
        path: ['TdB Thématique', 'TACTIQUE', 'Tableaux de Mat', 'Mat avec Pièces Mineures','Mat de Boden'],
        title: 'TdB2-2 : Morphy - Thompson (New York, 1859)',
        fen: 'r2k1r2/pp1b2pp/1b2Pn2/2p5/Q1B2Bq1/2P5/P5PP/3R1RK1 w - - 0 1',
        url: 'https://lichess.org/study/jtsBgg9o/iXk8AJny',
        marks: 'arrow:vert:d1>d7 arrow:bleu:a4>c6 arrow:rouge:c4>a6'
    },

     {
        path: ['TdB Thématique', 'TACTIQUE', 'Tableaux de Mat', 'Mat avec Pièces Mineures','Mat de Boden'],
        title: 'TdB2-3 : Schulder - Boden (Londres, 1860)',
        fen: '2k1rb1r/ppp3pp/2np1q2/5b2/2B2P2/2P1BQ2/PP1N1P1P/2KR3R b - - 0 1',
        url: 'https://lichess.org/study/jtsBgg9o/SURLwAiF',
        marks: 'arrow:bleu:f6>c3 arrow:rouge:f8>a3 arrow:vert:d6>d5'
    },


     {
        path: ['TdB Thématique', 'TACTIQUE', 'Tableaux de Mat', 'Mat avec Pièces Mineures','Mat du Corridor Diagonal'],
        title: 'TdB14-1 : Morphy - NN (Nouvelle Orléans, 1850)',
        fen: 'r1bq3r/ppk3pp/3b4/3Q4/3p1B2/8/PPP2PPP/4R1K1 w - - 0 1',
        url: 'https://lichess.org/study/6QVcrTwJ/mAh3DpKX'
    },

     {
        path: ['TdB Thématique', 'TACTIQUE', 'Tableaux de Mat', 'Mat avec Pièces Mineures','Mat du Corridor Diagonal'],
        title: 'TdB14-2 : Capablanca - Spielmann (San Sebastian, 1911)',
        fen: '7k/ppq1b1pp/8/2P5/1P2R1Q1/2P5/P2B1rPp/7K w - - 0 1',
        url: 'https://lichess.org/study/6QVcrTwJ/7hpEx5eO'
    },

     {
        path: ['TdB Thématique', 'TACTIQUE', 'Tableaux de Mat', 'Mat avec Pièces Mineures','Mat du Corridor Diagonal'],
        title: 'TdB14-3 : Fernandez - Lommer (Valence, 1967)',
        fen: '2r4k/7p/8/8/4Q3/1P1B4/P2p1q2/K2R4 b - - 0 1',
        url: 'https://lichess.org/study/6QVcrTwJ/hAJxDAEe'
    },


     {
        path: ['TdB Thématique', 'TACTIQUE', 'Tableaux de Mat', 'Mat avec Pièces Mineures','Mat de Lucena'],
        title: 'TdB5-1 : Almeida - Feijoeiro (Lisbonne, 1993)',
        fen: 'r1b1r3/pp1nBkbp/1qpQ2p1/8/4PPn1/2N2N2/PPP3PP/R4R1K w - - 0 1',
        url: 'https://lichess.org/study/RTIUJ9IG/D5nSMvcx',
        marks: 'arrow:vert:f3>g5 arrow:bleu:d6>e6 arrow:rouge:g5>f7'
    },

     {
        path: ['TdB Thématique', 'TACTIQUE', 'Tableaux de Mat', 'Mat avec Pièces Mineures','Mat de Lucena'],
        title: 'TdB5-2 : Beier - Breithut (Schney, 1993)',
        fen: 'r3r1k1/1b2ppbp/p4np1/1pq5/5B2/1BP2N1P/PP2QPP1/3R1RK1 w - - 0 1',
        url: 'https://lichess.org/study/RTIUJ9IG/jMKwqojY',
        marks: 'arrow:vert:b3>f7 arrow:bleu:f3>g5 arrow:rouge:e2>e6'
    },

     {
        path: ['TdB Thématique', 'TACTIQUE', 'Tableaux de Mat', 'Mat avec Pièces Mineures','Mat de Lucena'],
        title: 'TdB5-3 : Zatulovskaïa - Skegina (Sotchi, 1982)',
        fen: '2rr2k1/p5bp/1pn1R3/2pp1pN1/5P2/1Pq3P1/P2Q1B1P/3R1K2 w - - 0 1',
        url: 'https://lichess.org/study/RTIUJ9IG/ULHG9a0s',
        marks: 'arrow:vert:e6>e8 arrow:bleu:d2>d5 arrow:rouge:g5>f7'
    },



      // --------------- Motifs Tactiques ----------
      // ------------------- La Fourchette ----------
      // ------------------- Le Clouage ----------
      // ------------------- Le Clouage en Croix ----------
      // ------------------- L'Enfilade ----------
      // ------------------- L'Attaque à la Découverte ----------
      // ------------------- La Déviation d'Ouverture de Ligne ----------
      // ------------------- L'Interception ----------
      // ------------------- L'Attaque aux Rayons-X ----------

     {
        path: ['TdB Thématique', 'TACTIQUE', 'Motifs Tactiques', 'La Fourchette'],
        title: 'TdB21-1 : Euwe - Davidson (Amsterdam, 1924)',
        fen: '6k1/p4p1p/1p3np1/2q5/4p3/4P1N1/PP3PPP/3Q2K1 w - - 0 1',
        url: 'https://lichess.org/study/jgWiiJt2/CWyIFt9o'
    },

     {
        path: ['TdB Thématique', 'TACTIQUE', 'Motifs Tactiques', 'La Fourchette'],
        title: 'TdB21-2 : Petrossian - Spassky (Moscou, 1966)',
        fen: '6k1/r4r1p/p2NB3/nppP2q1/2P5/1P2N3/PQ5P/7K w - - 0 1',
        url: 'https://lichess.org/study/jgWiiJt2/uFYTmJ2R'
    },

     {
        path: ['TdB Thématique', 'TACTIQUE', 'Motifs Tactiques', 'La Fourchette'],
        title: 'TdB21-3 : Bogolioubov - Müller (Triberg, 1934)',
        fen: '2k4r/1pp2ppp/p1p1bn2/4N3/1q1rP3/2N1Q3/PPP2PPP/R4RK1 w - - 0 1',
        url: 'https://lichess.org/study/jgWiiJt2/XKwmWOYb'
    },


     {
        path: ['TdB Thématique', 'TACTIQUE', 'Motifs Tactiques', 'Le Clouage'],
        title: 'TdB22-1 : Bründtrup - Budrich (Berlín, 1954)',
        fen: '5k2/6p1/p2q3p/b7/2QB4/7P/P5P1/6K1 w - - 0 1',
        url: 'https://lichess.org/study/XaOMRNIC/mSCj23Qg'
    },

     {
        path: ['TdB Thématique', 'TACTIQUE', 'Motifs Tactiques', 'Le Clouage'],
        title: 'TdB22-2 : Kieninger - Herrmann (Bad Oeynhausen, 1940)',
        fen: '8/4kpp1/4p1p1/Q2pP1P1/2pR1P2/PrP3Pq/1P6/2K5 w - - 1 1',
        url: 'https://lichess.org/study/XaOMRNIC/vmbdoaXT'
    },

     {
        path: ['TdB Thématique', 'TACTIQUE', 'Motifs Tactiques', 'Le Clouage'],
        title: 'TdB22-3 : Lexandrovitch - Krummhauer (Berlin, 1951) (variante)',
        fen: '8/4kpp1/4p1p1/Q2pP1P1/2pR1P2/PrP3Pq/1P6/2K5 w - - 1 1',
        url: 'https://lichess.org/study/XaOMRNIC/QoKSyppO'
    },


     {
        path: ['TdB Thématique', 'TACTIQUE', 'Motifs Tactiques', 'Le Clouage en Croix'],
        title: 'TdB26-1 : Bogatyriev - Sagoryanski (Moscou, 1947)',
        fen: '8/5p1k/6pp/8/5P2/r2R2KP/3Q2P1/6q1 b - - 0 1',
        url: 'https://lichess.org/study/pbBvlKwx/1sxiyhyV'
    },

     {
        path: ['TdB Thématique', 'TACTIQUE', 'Motifs Tactiques', 'Le Clouage en Croix'],
        title: 'TdB26-2 : Halosar - Poschauko (Graz, 1941)',
        fen: '1r4k1/4qppp/Q2pb3/8/8/b1P5/PP3PPP/1KB2B1R b - - 0 1',
        url: 'https://lichess.org/study/pbBvlKwx/syJWBUQA'
    },

     {
        path: ['TdB Thématique', 'TACTIQUE', 'Motifs Tactiques', 'Le Clouage en Croix'],
        title: 'TdB26-3 : Pidorich - Chernusov (Tjumen, 1981)',
        fen: 'r5k1/5Rpp/1bqp4/1p1bp3/1P6/1BP4P/1B2QPP1/6K1 w - - 0 1',
        url: 'https://lichess.org/study/pbBvlKwx/uP260Ey3'
    },


     {
        path: ['TdB Thématique', 'TACTIQUE', 'Motifs Tactiques', 'L\'Enfilade'],
        title: 'TdB23-1 : Rivera - Fischer (1962, Varna)',
        fen: 'r4rk1/pbq2ppp/1p2pn2/n1p5/3P4/PBP1P1N1/1B3PPP/2RQ1RK1 b q - 0 1',
        url: 'https://lichess.org/study/B4rB3ELK/fZN8tFK4'
    },

     {
        path: ['TdB Thématique', 'TACTIQUE', 'Motifs Tactiques', 'L\'Enfilade'],
        title: 'TdB23-2 : Byrne - Tarjan (Oberlin, 1975)',
        fen: '1q4k1/4pR2/p3r1p1/6P1/8/P1P2Q2/KP6/8 w - - 0 1',
        url: 'https://lichess.org/study/B4rB3ELK/xoWCcHpy'
    },

     {
        path: ['TdB Thématique', 'TACTIQUE', 'Motifs Tactiques', 'L\'Enfilade'],
        title: 'TdB23-3 : Short - Vaganian (Barcelone, 1989)',
        fen: '2Q5/1pR3r1/p4k2/6p1/P2qb3/6BP/5PP1/6K1 w - - 0 1',
        url: 'https://lichess.org/study/B4rB3ELK/Ow1h32XH'
    },


     {
        path: ['TdB Thématique', 'TACTIQUE', 'Motifs Tactiques', 'L\'Attaque à la Découverte'],
        title: 'TdB27-1 : Réti - Tartakover (Vienne, 1910)',
        fen: 'rnb1kb1r/pp3ppp/2p5/4q3/4n3/3Q4/PPPB1PPP/2KR1BNR w kq - 0 1',
        url: 'https://lichess.org/study/JxGoy3cj/16P1PIK2'
    },

     {
        path: ['TdB Thématique', 'TACTIQUE', 'Motifs Tactiques', 'L\'Attaque à la Découverte'],
        title: 'TdB27-2 : Ed. Lasker - Thomas (Londres, 1912)',
        fen: 'rn3rk1/pbppq1pp/1p2pb2/4N2Q/3PN3/3B4/PPP2PPP/R3K2R w KQ - 0 1',
        url: 'https://lichess.org/study/JxGoy3cj/sxjsmqur'
    },

     {
        path: ['TdB Thématique', 'TACTIQUE', 'Motifs Tactiques', 'L\'Attaque à la Découverte'],
        title: 'TdB27-3 : Anand - Lautier (Bienne, 1997)',
        fen: '3rk2r/pR3p1p/2p1p2p/3n4/3q2P1/3BRP2/P1P2Kb1/2BQ4 w - - 0 1',
        url: 'https://lichess.org/study/JxGoy3cj/fhCoGxZv'
    },


     {
        path: ['TdB Thématique', 'TACTIQUE', 'Motifs Tactiques', 'La Déviation d\'Ouverture de Ligne'],
        title: 'TdB24-1 : Torre - Timman (Hambourg, 1982)',
        fen: '4r1k1/1pQ3pp/2p2p2/P3n3/6b1/6P1/1P2PP1P/1R1NqBK1 b - - 0 1',
        url: 'https://lichess.org/study/oQq5Yf6f/ZnyqiMsC'
    },

     {
        path: ['TdB Thématique', 'TACTIQUE', 'Motifs Tactiques', 'La Déviation d\'Ouverture de Ligne'],
        title: 'TdB24-2 : Timman - Tatai (Amsterdam, 1977)',
        fen: '4k3/pr2rp1p/q2pbQ2/8/2N5/6R1/P4PPP/4R1K1 w - - 0 1',
        url: 'https://lichess.org/study/oQq5Yf6f/NL0MFzy5'
    },

     {
        path: ['TdB Thématique', 'TACTIQUE', 'Motifs Tactiques', 'La Déviation d\'Ouverture de Ligne'],
        title: 'TdB24-3 : Kovačević - Timman (Bugojno, 1984)',
        fen: '2r1r1k1/p4pp1/1p1Pn1p1/6q1/P5P1/BP2Pp1P/5P2/Q1RR2K1 b - - 0 1',
        url: 'https://lichess.org/study/oQq5Yf6f/PzgSQ7cb'
    },


     {
        path: ['TdB Thématique', 'TACTIQUE', 'Motifs Tactiques', 'L\'Interception'],
        title: 'TdB25-1 : Réti - Bogolioubov (New York, 1924)',
        fen: '3r1bk1/ppq3pp/2p5/2P2Q1B/8/1P4P1/P6P/5RK1 w - - 0 1',
        url: 'https://lichess.org/study/TOpdMfob/51y3nl26'
    },

     {
        path: ['TdB Thématique', 'TACTIQUE', 'Motifs Tactiques', 'L\'Interception'],
        title: 'TdB25-2 : Gustafsson - Seger (Hambourg, 2001)',
        fen: '4r1k1/1n1q1pbp/6p1/p2r4/2Q5/B7/P3NPPP/2R2RK1 b - - 1 1',
        url: 'https://lichess.org/study/TOpdMfob/T5mezpSd'
    },

     {
        path: ['TdB Thématique', 'TACTIQUE', 'Motifs Tactiques', 'L\'Interception'],
        title: 'TdB25-3 : Turner - Howell (West Bromwich, 2004)',
        fen: '5r2/pp5r/4b1pk/2q4p/2P3P1/2Q1N3/P4P2/3R1K1R w - - 1 1',
        url: 'https://lichess.org/study/TOpdMfob/EV5sYnvY'
    },


     {
        path: ['TdB Thématique', 'TACTIQUE', 'Motifs Tactiques', 'L\'Attaque aux Rayons-X'],
        title: 'TdB28-1 : Frit - Moreau (Ste Foy d\'Aigrefeuille, 2026)',
        fen: '2r5/2Pk4/pBR1p3/P3P3/3p4/2bK4/8/8 w - - 0 1',
        url: 'https://lichess.org/study/P8VvH1zm/M5L5jWeZ'
    },

     {
        path: ['TdB Thématique', 'TACTIQUE', 'Motifs Tactiques', 'L\'Attaque aux Rayons-X'],
        title: 'TdB28-2 : Tisdall - J. Polgar (Reykjavik, 1988)',
        fen: 'k7/1p1q1pp1/p2p4/P2Pn1P1/4R2r/5N2/KPP1Q1R1/7r b - - 1 1',
        url: 'https://lichess.org/study/P8VvH1zm/eX5XFfMg'
    },

     {
        path: ['TdB Thématique', 'TACTIQUE', 'Motifs Tactiques', 'L\'Attaque aux Rayons-X'],
        title: 'TdB28-3 : Rakolta - Janoczy (Tchécoslovaquie, 1978)',
        fen: 'k7/p1p1p3/2P5/8/3rR3/8/PP2Qq2/K7 w - - 0 1',
        url: 'https://lichess.org/study/P8VvH1zm/rmm1ftwi'
    },


      // --------------- Spéciales ----------
      // ------------------- Spéciale Philidor ----------
      // ------------------- Spéciale Timman ----------


     {
        path: ['TdB Thématique', 'TACTIQUE', 'Séries Spéciales', 'Spéciale Philidor'],
        title: 'TdB29-1 : von Brühl - Philidor (Londres, 1783)',
        fen: '3R4/5k2/3P3P/8/5p2/4p2P/3r4/5K2 b - - 0 1',
        url: 'https://lichess.org/study/yt4sMM6g/MJ9ozOa5'
    },

     {
        path: ['TdB Thématique', 'TACTIQUE', 'Séries Spéciales', 'Spéciale Philidor'],
        title: 'TdB29-2 : Philidor - von Brühl (Londres, 1788)',
        fen: '2b1k3/5r2/4pBpP/3pP1P1/2pP2BK/1pP5/1P6/8 w - - 0 1',
        url: 'https://lichess.org/study/yt4sMM6g/Wv4flRhe'
    },

     {
        path: ['TdB Thématique', 'TACTIQUE', 'Séries Spéciales', 'Spéciale Philidor'],
        title: 'TdB29-3 : Philidor - von Brühl (Londres, 1789)',
        fen: 'r2n1rbk/1p1qn1pp/pb2p3/3pP2P/1P1P1PP1/P3BNK1/R7/1B1Q3R w - - 0 1',
        url: 'https://lichess.org/study/yt4sMM6g/vy3VUsea'
    },

     {
        path: ['TdB Thématique', 'TACTIQUE', 'Séries Spéciales', 'Spéciale Philidor'],
        title: 'TdB29-7 : Morphy - Duc de Brunswick & Comte Isouard (Paris, 1858)',
        fen: '3rkb1r/p2nqppp/5n2/1B2p1B1/4P3/1Q6/PPP2PPP/2KR3R w k - 3 13',
        url: 'https://lichess.org/study/yt4sMM6g/sgkQFtIR#28'
    },

     {
        path: ['TdB Thématique', 'TACTIQUE', 'Séries Spéciales', 'Spéciale Philidor'],
        title: 'TdB29-8 : van der Wiel - van Baarle (Amsterdam, 1983)',
        fen: 'r1bqk2r/pp1nbppp/2p4n/4p1N1/2B1P3/8/PPP2PPP/RNBQ1RK1 w kq - 4 8',
        url: 'https://lichess.org/study/yt4sMM6g/8n15GBJA#14'
    },

     {
        path: ['TdB Thématique', 'TACTIQUE', 'Séries Spéciales', 'Spéciale Philidor'],
        title: 'TdB29-9 : E. Adams - C. Torre (Nouvelle Orléans, 1920)',
        fen: '2r1r1k1/1p1q1ppp/3p1b2/p2P4/3Q4/5N2/PP2RPPP/4R1K1 w - - 0 18',
        url: 'https://lichess.org/study/yt4sMM6g/FjB3TuKk#34'
    },


     {
        path: ['TdB Thématique', 'TACTIQUE', 'Séries Spéciales', 'Spéciale Timman'],
        title: 'TdB24-1 : Torre - Timman (Hambourg, 1982)',
        fen: '4r1k1/1pQ3pp/2p2p2/P3n3/6b1/6P1/1P2PP1P/1R1NqBK1 b - - 0 1',
        url: 'https://lichess.org/study/oQq5Yf6f/ZnyqiMsC'
    },

     {
        path: ['TdB Thématique', 'TACTIQUE', 'Séries Spéciales', 'Spéciale Timman'],
        title: 'TdB24-2 : Timman - Tatai (Amsterdam, 1977)',
        fen: '4k3/pr2rp1p/q2pbQ2/8/2N5/6R1/P4PPP/4R1K1 w - - 0 1',
        url: 'https://lichess.org/study/oQq5Yf6f/NL0MFzy5'
    },

     {
        path: ['TdB Thématique', 'TACTIQUE', 'Séries Spéciales', 'Spéciale Timman'],
        title: 'TdB24-3 : Kovačević - Timman (Bugojno, 1984)',
        fen: '2r1r1k1/p4pp1/1p1Pn1p1/6q1/P5P1/BP2Pp1P/5P2/Q1RR2K1 b - - 0 1',
        url: 'https://lichess.org/study/oQq5Yf6f/PzgSQ7cb'
    },



// ---------- FINALES ----------

// -------------------- Finales de Pions ----------
// ------------------------- RP vs R ----------
// ------------------------- RP vs RP ----------
// ------------------------- RPP vs RP ----------
 


     {
        path: ['TdB Thématique', 'FINALES', 'Finales de Pions', '{RP} vs {r} - Cases Clés du {P} passé'],
        title: 'TdB3-4 : J. Drtina (Casopis Ceskych Sachistu, 1908)',
        fen: '5k2/8/8/8/8/2P5/8/3K4 w - - 0 1',
        url: 'https://lichess.org/study/uMLLix2a/2YIcxk9x',
        marks: 'border:vert:b8,b7,b6,b5,c5,d5,d6,d7,d8,c8,c7,c6 disc:vert:b5,c5,d5 text=1:bleu:c4 text=1:rouge:c6 label=2a:bleu:b4 label=2a:rouge:b6 label=2b:rouge:d6 label=2b:bleu:d4 disc:vert:e5,f5,g5,h5,a5 text=3:cyan:a4 text=3:rose:a6 text=4:rose:e6 text=5:rose:f6 text=6:rose:g6 text=7:rose:h6 text=7:cyan:h4 text=6:cyan:g4 text=5:cyan:f4 text=4:cyan:e4'
    },

     {
        path: ['TdB Thématique', 'FINALES', 'Finales de Pions', '{RP} vs {r} - Cases Clés du {P} passé'],
        title: 'TdB3-5 : d\'après J. Drtina',
        fen: '4k3/8/8/8/8/2P5/8/3K4 w - - 0 1',
        url: 'https://lichess.org/study/uMLLix2a/h1sIWnZw',
        marks: 'border:vert:b8,b7,b6,b5,c5,d5,d6,d7,d8,c8,c7,c6 disc:vert:b5,c5,d5 text=1:bleu:c4 text=1:rouge:c6 label=2a:bleu:b4 label=2a:rouge:b6 label=2b:rouge:d6 label=2b:bleu:d4 disc:vert:e5,f5,g5,h5,a5 text=3:cyan:a4 text=3:rose:a6 text=4:rose:e6 text=5:rose:f6 text=6:rose:g6 text=7:rose:h6 text=7:cyan:h4 text=6:cyan:g4 text=5:cyan:f4 text=4:cyan:e4'
    },


     {
        path: ['TdB Thématique', 'FINALES', 'Finales de Pions', '{RP} vs {rp}', '{P}/{p} bloqués - Le Trébuchet'],
        title: 'TdB5-4 : P.A. Durand (La Régence, 1860)',
        fen: '8/8/1k1p4/3P1K2/8/8/8/8 w - - 0 1',
        url: 'https://lichess.org/study/RTIUJ9IG/GabMVrOq',
        marks: 'border:vert:d6,e6,f6,g6,g7,g8,f7,f8,e8,e7,d7,d8,c6,b6,a6,a7,a8,b8,c8,c7,b7 border:bleu:e6 border:rouge:c5 label=ZZ:rouge:c5 label=ZZ:bleu:e6 arrow:vert:f5>f6'
    },

     {
        path: ['TdB Thématique', 'FINALES', 'Finales de Pions', '{RP} vs {rp}', '{P}/{p} bloqués - Le Trébuchet'],
        title: 'TdB5-5 : P.A. Durand (La Régence, 1860)',
        fen: '8/8/8/1k1p4/3P1K2/8/8/8 w - - 0 1',
        url: 'https://lichess.org/study/RTIUJ9IG/DlvmEGhk',
        marks: 'border:vert:g5,g6,g7,f7,e7,d7,c7,b7,a7,a6,a5,b5,c5,b6,c6,d6,e6,f6,d5,e5,f5 border:bleu:e5 box:rouge:c4 label=ZZ:rouge:c4 label=ZZ:bleu:e5'
    },


     {
        path: ['TdB Thématique', 'FINALES', 'Finales de Pions', '{RP} vs {rp}', '{P}/{p} bloqués - Cases Clés'],
        title: 'TdB9-4 : A. Villeneuve (Les Finales, 1982)',
        fen: '4k3/8/4p3/4P3/8/3K4/8/8 w - - 8 1',
        url: 'https://lichess.org/study/p2znRfiY/aJJ6Y4Ih',
        marks: 'border:vert:d6,e6,f6,g6,h6,h7,h8,g8,g7,f7,f8,e7,d8,d7,e8,c6,b6,b7,b8,c8,c7 disc:vert:b6,c6,d6,f6,g6,h6 text=1:bleu:c5 text=2:bleu:b5 text=2:rouge:b7 text=1:rouge:c7 cross:rouge:d5 text=3:cyan:b4,c4 text=3:rose:b8,c8'
    },

     {
        path: ['TdB Thématique', 'FINALES', 'Finales de Pions', '{RP} vs {rp}', '{P}/{p} bloqués - Cases Clés'],
        title: 'TdB9-5 : Inédit (TdB9, 2025)',
        fen: '3k4/8/4p3/4P3/8/2K5/8/8 w - - 8 1',
        url: 'https://lichess.org/study/p2znRfiY/D0rLpMg7',
        marks: 'border:vert:d6,e6,f6,g6,h6,h7,h8,g8,g7,f7,f8,e7,d8,d7,e8,c6,b6,b7,b8,c8,c7 disc:vert:b6,c6,d6,f6,g6,h6 text=1:bleu:c5 text=2:bleu:b5 text=2:rouge:b7 text=1:rouge:c7 cross:rouge:d5 text=3:cyan:b4,c4 text=3:rose:b8,c8'
    },

    
     {
        path: ['TdB Thématique', 'FINALES', 'Finales de Pions', '{RPP} vs {rp}', '{P}/{p} bloqués + {P} arriéré - Cases Clés'],
        title: 'TdB11-4 : Kovacs - Rigo (Hongrie, 1973)',
        fen: '1K6/8/4k3/8/5p2/5P2/4P3/8 b - - 11 1',
        url: 'https://lichess.org/study/qwVCWJlT/a3F0xNhN'
    },

     {
        path: ['TdB Thématique', 'FINALES', 'Finales de Pions', '{RPP} vs {rp}', '{P}/{p} bloqués + {P} arriéré - Cases Clés'],
        title: 'TdB11-5 : Baron Rodriguez - Minzer (Mancha Real, 2000)',
        fen: '8/3k4/3p4/3P4/2PK4/8/8/8 b - - 21 1',
        url: 'https://lichess.org/study/qwVCWJlT/4P1x7hhW'
    },

     {
        path: ['TdB Thématique', 'FINALES', 'Finales de Pions', '{RPP} vs {rp}', '{P}/{p} bloqués + {P} arriéré - Cases Clés'],
        title: 'TdB11-6 : F. Dedrle (Deutsches Wochenschach, 1921)',
        fen: '8/4k3/3p4/3P4/2P5/8/8/5K2 w - - 11 1',
        url: 'https://lichess.org/study/qwVCWJlT/YszQUMO1'
    },


     {
        path: ['TdB Thématique', 'FINALES', 'Finales de Pions', '{RPP} vs {rp}', '{P}/{p} bloqués + {P} passé protégé - Cases Clés'],
        title: 'TdB18-4 : J. Buijs & R. Hendriks (Spiegelen Springen Schuiven Draaien, 1993)',
        fen: '8/8/8/4k3/6pP/6P1/K7/8 w - - 0 1',
        url: 'https://lichess.org/study/jXpZv9Ui/gWdxns2o',
        marks: 'border:vert:f4,e4,d4,d5,d6,d7,e7,f7,g7,h7,h6,h5,g5,f5,e5,e6,f6,g6 cross:bleu:f4,g5 cross:rouge:f3 text=1:rouge:e5 text=2:rouge:d5 text=3:rouge:e4 text=4:rouge:d4 text=5:rouge:e6 text=6:rouge:d6 text=7:rouge:e7 text=8:rouge:d7 text=9:rouge:f6 text=10:rouge:g6 text=11:rouge:h6 text=11:bleu:h8 text=10:bleu:g8 text=9:bleu:f8 text=5:bleu:e8 text=6:bleu:d8,b8,b6 text=5:bleu:c8,c6 text=7:bleu:c7 text=8:bleu:b7 text=1:bleu:c5,c3,e3 text=2:bleu:d3,b5,b3 text=3:bleu:c4 text=4:bleu:b4 label=1%27:bleu:a3 label=3%27:bleu:a4 label=1%27:bleu:a5 label=5%27:bleu:a6 label=7%27:bleu:a7 label=5%27:bleu:a8'
    },

     {
        path: ['TdB Thématique', 'FINALES', 'Finales de Pions', '{RPP} vs {rp}', '{P}/{p} bloqués + {P} passé protégé - Cases Clés'],
        title: 'TdB18-5 : F. Dedrle (Studie, 1925)',
        fen: '8/2k5/8/8/Pp6/1P6/6K1/8 b - - 0 1',
        url: 'https://lichess.org/study/jXpZv9Ui/3vjTiAKd',
        marks: 'border:vert:b4,c4,d4,e4,e5,e6,e7,d7,c7,b7,a7,a6,a5,b5,c5,d5,d6,c6,b6 cross:rouge:c3 cross:bleu:b5,c4 text=1:bleu:d3 text=2:bleu:e3 text=1:bleu:f3,f5 text=2:bleu:g3,g5 text=2:rouge:e5 text=1:rouge:d5 text=3:rouge:d4 text=4:rouge:e4 text=6:rouge:e6 text=5:rouge:d6 text=7:rouge:d7 text=8:rouge:e7 text=9:rouge:c6 text=10:rouge:b6 text=11:rouge:a6 text=3:bleu:f4 text=4:bleu:g4 text=5:bleu:f6 text=6:bleu:g6 text=7:bleu:f7 text=8:bleu:g7 text=6:bleu:g8 text=5:bleu:f8 text=6:bleu:e8 text=5:bleu:d8 text=9:bleu:c8 text=10:bleu:b8 text=11:bleu:a8 label=1%27:bleu:h3,h5 label=3%27:bleu:h4 label=5%27:bleu:h6 label=7%27:bleu:h7 label=5%27:bleu:h8'
    },

     {
        path: ['TdB Thématique', 'FINALES', 'Finales de Pions', '{RPP} vs {rp}', '{P}/{p} bloqués + {P} passé protégé - Cases Clés'],
        title: 'TdB18-6 : R. Bianchetti (Contributo alla Teoria dei Finali di soli Pedoni, 1925)',
        fen: '8/8/1p6/pP6/8/K7/8/k7 w - - 0 1',
        url: 'https://lichess.org/study/jXpZv9Ui/OZ2yCq8F',
        marks: 'border:orange:c5,d5,e5,e4,b5,a4,b4,c4,d4,e3,e2,d2,c2,b2,a2,a3,b3,c3,d3 cross:rouge:b4,c5 cross:bleu:c6 text=3:bleu:d5 text=4:bleu:e5 text=1:bleu:d4 text=2:bleu:e4 text=5:bleu:d3 text=6:bleu:e3 text=7:bleu:d2 text=8:bleu:e2 text=9:bleu:c3 text=10:bleu:b3 text=11:bleu:a3 text=11:rouge:a1 text=10:rouge:b1 text=9:rouge:c1 text=5:rouge:d1 text=6:rouge:e1 text=5:rouge:f1 text=6:rouge:g1,g3 text=5:rouge:f3 text=7:rouge:f2 text=8:rouge:g2 text=1:rouge:f4 text=2:rouge:g4 text=3:rouge:f5 text=4:rouge:g5 text=1:rouge:d6 text=2:rouge:e6,g6 text=1:rouge:f6 label=1%27:rouge:h6,h4 label=3%27:rouge:h5 label=5%27:rouge:h3 label=7%27:rouge:h2 label=5%27:rouge:h1'
    },


     {
        path: ['TdB Thématique', 'FINALES', 'Finales de Pions', '{RPP} vs {rp}', '{P}/{p}-Tour bloqués + {P} passé protégé - Règles de Bähr'],
        title: 'TdB27-4 : Laskiewicz - Framberk (Chrudim, 2002)',
        fen: '8/8/5k2/p7/P4PK1/8/8/8 w - - 0 1',
        url: 'https://lichess.org/study/JxGoy3cj/M7fgBwRG'
    },

     {
        path: ['TdB Thématique', 'FINALES', 'Finales de Pions', '{RPP} vs {rp}', '{P}/{p}-Tour bloqués + {P} passé protégé - Règles de Bähr'],
        title: 'TdB27-5 : Manatakis - Niarhos (La Canée, 2003)',
        fen: '8/8/p5rk/6R1/P4K1P/8/8/8 b - - 0 1',
        url: 'https://lichess.org/study/JxGoy3cj/pjTBHmzK'
    },

     {
        path: ['TdB Thématique', 'FINALES', 'Finales de Pions', '{RPP} vs {rp}', '{P}/{p}-Tour bloqués + {P} passé protégé - Règles de Bähr'],
        title: 'TdB27-6 : W. Bähr (Der Alemanne, 1935)',
        fen: '8/4k3/p7/P6p/7P/5K2/8/8 w - - 0 1',
        url: 'https://lichess.org/study/JxGoy3cj/Y30JRuQa'
    },



// -------------------- Finales de Cavaliers ----------
// ------------------------- RC vs RP ----------


     {
        path: ['TdB Thématique', 'FINALES', 'Finales de Cavaliers', '{RC} vs {rp}', '{p}-Tour'],
        title: 'TdB2-4 : J. de La Villa (Los 100 Finales que hay que saber, 2008)',
        fen: '7K/8/8/8/7N/7p/7k/8 w - - 0 1',
        url: 'https://lichess.org/study/jtsBgg9o/2q4BBMH0',
        marks: 'circle:bleu:h2,g4,e3,f1'
    },

     {
        path: ['TdB Thématique', 'FINALES', 'Finales de Cavaliers', '{RC} vs {rp}', '{p}-Tour'],
        title: 'TdB2-5 : J. Levitt (1997)',
        fen: '7K/8/8/8/7N/7p/8/7k w - - 0 1',
        url: 'https://lichess.org/study/jtsBgg9o/qNwXThkA',
        marks: 'circle:vert:h2,g4,e3,f1'
    },


    
// -------------------- Finales de Fous ----------
// ------------------------- RFP vs RF ----------

 

     {
        path: ['TdB Thématique', 'FINALES', 'Finales de Fous', '{RFP} vs {rf}', '{F}/{f} de même couleur - Règle de Centurini'],
        title: 'TdB7-4 : Y. Averbakh (Comprehensive Chess Endings, 2012)',
        fen: '8/1K6/2P5/1k4B1/8/6b1/8/8 w - - 12 1',
        url: 'https://lichess.org/study/j6Q6uKTU/0slMczrp'
    },

     {
        path: ['TdB Thématique', 'FINALES', 'Finales de Fous', '{RFP} vs {rf}', '{F}/{f} de même couleur - Règle de Centurini'],
        title: 'TdB7-5 : J. de la Villa (Los 100 Finales que hay que saber, 2008)',
        fen: '8/K7/1P6/k4B2/8/5b2/8/8 w - - 12 1',
        url: 'https://lichess.org/study/j6Q6uKTU/hCoQnzKJ'
    },

     {
        path: ['TdB Thématique', 'FINALES', 'Finales de Fous', '{RFP} vs {rf}', '{F}/{f} de même couleur - Règle de Centurini'],
        title: 'TdB7-6 : L. Centurini (La Régence, 1856)',
        fen: '2KB4/1P6/2k5/8/8/8/7b/8 w - - 12 1',
        url: 'https://lichess.org/study/j6Q6uKTU/KdoyUr3T'
    },



// -------------------- Finales de Tours ----------

// ------------------------- RT vs RP(P) ----------


     {
        path: ['TdB Thématique', 'FINALES', 'Finales de Tours', '{RT} vs {rp} - La Coupure en 5e'],
        title: 'TdB6-4 : M. Dvoretsky (Manuel des Finales, 2004)',
        fen: '7K/6R1/1k6/p7/8/8/8/8 w - - 0 1',
        url: 'https://lichess.org/study/pPDqTYSi/dOZSowRH',
        marks: 'arrow:vert:g7>g5 cross:vert:b5,c5,d5,e5,f5,g5,h5'
    },

     {
        path: ['TdB Thématique', 'FINALES', 'Finales de Tours', '{RT} vs {rp} - La Coupure en 5e'],
        title: 'TdB6-5 : J. de la Villa (Los 100 Finales que hay que saber, 2008)',
        fen: '6KR/8/pk6/8/8/8/8/8 b - - 0 1',
        url: 'https://lichess.org/study/pPDqTYSi/CV7viWrP',
        marks: 'arrow:gris:h8>h5 arrow:vert:b6>c5 disc:gris:a5,b5,c5,d5,e5,f5,g5,h5'
    },

    
     {
        path: ['TdB Thématique', 'FINALES', 'Finales de Tours', '{RT} vs {rp} - L\'Echelle de Saavedra'],
        title: 'TdB2-6 : F. Saavedra / G .E. Barbier (Glasgow Weekly Citizen, 1895)',
        fen: '8/8/1KP5/3r4/8/8/8/k7 w - - 0 1',
        url: 'https://lichess.org/study/jtsBgg9o/rnfGaUJn',
        marks: 'arrow:vert:c6>c8 piece=Rw:vert:c8'
    },


     {
        path: ['TdB Thématique', 'FINALES', 'Finales de Tours', '{RT} vs {rpp}', '{pp} passés liés éloignés des Rois'],
        title: 'TdB8-4 : J. Moravec (28 Rijen, 1924)',
        fen: '8/k7/2K5/8/8/8/6pp/1R6 w - - 0 1',
        url: 'https://lichess.org/study/Iofs72fq/N6Nou8GA'
    },

     {
        path: ['TdB Thématique', 'FINALES', 'Finales de Tours', '{RT} vs {rpp}', '{pp} passés liés éloignés des Rois'],
        title: 'TdB8-5 : J. Kling & B. Horwitz (Chess Studies, 1851)',
        fen: '8/8/5K2/7k/8/p7/1p6/1R6 w - - 9 1',
        url: 'https://lichess.org/study/Iofs72fq/j2ftbp46'
    },

     {
        path: ['TdB Thématique', 'FINALES', 'Finales de Tours', '{RT} vs {rpp}', '{pp} passés liés éloignés des Rois'],
        title: 'TdB8-6 : M. Schapiro (Rheinische Volkswacht, 1920)',
        fen: '8/8/8/3R4/2K5/6pp/k7/8 w - - 0 1',
        url: 'https://lichess.org/study/Iofs72fq/bgHeSJAX'
    },


// ------------------------- RTP vs RT ----------



     {
        path: ['TdB Thématique', 'FINALES', 'Finales de Tours', '{RTP} vs {rt}', 'L\'Enfilade en Finales de Tours'],
        title: 'TdB23-4 : Hebden - Speelman (Southend, 2000)',
        fen: '8/4k3/PR6/7r/4K3/8/8/8 w - - 0 1',
        url: 'https://lichess.org/study/B4rB3ELK/JbEcyVsw'
    },
     
    {
        path: ['TdB Thématique', 'FINALES', 'Finales de Tours', '{RTP} vs {rt}', 'L\'Enfilade en Finales de Tours'],
        title: 'TdB23-4 : Bernstein - Smyslov (Groningue, 1946)',
        fen: '1R6/8/8/5k2/5p2/7r/1p2K3/8 w - - 0 1',
        url: 'https://lichess.org/study/B4rB3ELK/JbEcyVsw'
    },


     {
        path: ['TdB Thématique', 'FINALES', 'Finales de Tours', '{RTP} vs {rt}', '{r} devant le {P}', 'Défense Passive'],
        title: 'TdB10-4 : M. Dvoretsky (Le Manuel des Finales, 2004)',
        fen: 'r5k1/8/5PK1/8/8/8/8/1R6 w - - 0 1',
        url: 'https://lichess.org/study/5ftHnQkJ/uaLnn7tY'
    },

     {
        path: ['TdB Thématique', 'FINALES', 'Finales de Tours', '{RTP} vs {rt}', '{r} devant le {P}', 'Défense Passive'],
        title: 'TdB10-5 : M. Dvoretsky (Le Manuel des Finales, 2004)',
        fen: 'r5k1/8/6PK/8/8/8/8/1R6 w - - 0 1',
        url: 'https://lichess.org/study/5ftHnQkJ/XDfCXrOR'
    },


     {
        path: ['TdB Thématique', 'FINALES', 'Finales de Tours', '{RTP} vs {rt}', '{r} devant le {P}', '{P} en 5e - La Défense de Philidor'],
        title: 'TdB22-4 : Danilov - Gheng (Miercurea Ciuc, 2001)',
        fen: '4k3/R7/5K2/4P2r/8/8/8/8 b - - 0 1',
        url: 'https://lichess.org/study/XaOMRNIC/lGAmgvkA'
    },
    
     {
        path: ['TdB Thématique', 'FINALES', 'Finales de Tours', '{RTP} vs {rt}', '{r} devant le {P}', '{P} en 5e - La Défense de Philidor'],
        title: 'TdB22-5 : Laudati - Pienabarca (Rome, 1997)',
        fen: '8/8/8/8/7r/1R3pk1/8/6K1 w - - 0 1',
        url: 'https://lichess.org/study/XaOMRNIC/NHCsVbiK'
    },


     {
        path: ['TdB Thématique', 'FINALES', 'Finales de Tours', '{RTP} vs {rt}', '{r} devant le {P}', '{P} en 5e - La Défense de Karstedt avec {P} central'],
        title: 'TdB25-4 : Piquemal - Bourguet (France, 2004)',
        fen: '1R6/8/8/8/4p3/5k2/r7/4K3 w - - 0 1',
        url: 'https://lichess.org/study/TOpdMfob/DwF2zwGe'
    },
    
     {
        path: ['TdB Thématique', 'FINALES', 'Finales de Tours', '{RTP} vs {rt}', '{r} devant le {P}', '{P} en 5e - La Défense de Karstedt avec {P} central'],
        title: 'TdB25-5 : Zournatsidis - Le Roux (Patras, 2001)',
        fen: '1R6/8/8/8/4p3/5k2/r7/5K2 w - - 0 1',
        url: 'https://lichess.org/study/TOpdMfob/G4AkX0C6'
    },


     {
        path: ['TdB Thématique', 'FINALES', 'Finales de Tours', '{RTP} vs {rt}', '{r} devant le {P}', '{P} en 5e - La Défense de Karstedt avec {P}-Fou'],
        title: 'TdB26-4 : Petran - Le (Budapest, 1997)',
        fen: '5k2/R7/6K1/5P2/8/8/8/1r6 b - - 0 1',
        url: 'https://lichess.org/study/pbBvlKwx/g1OnoDb6'
    },
    
     {
        path: ['TdB Thématique', 'FINALES', 'Finales de Tours', '{RTP} vs {rt}', '{r} devant le {P}', '{P} en 5e - La Défense de Karstedt avec {P}-Fou'],
        title: 'TdB26-5 : Gebhardt - Bogdanovich (Baden, 2010)',
        fen: '8/2P5/R7/5p2/p7/5k2/7K/2r5 b - - 0 1',
        url: 'https://lichess.org/study/pbBvlKwx/rgmTpizS'
    },


     {
        path: ['TdB Thématique', 'FINALES', 'Finales de Tours', '{RTP} vs {rt}', '{r} coupé verticalement', '{P} en 7e - {R} devant', 'Position de Lucena'],
        title: 'TdB21-4 : A. Salvio (Il Puttino, 1634)',
        fen: '1K1k4/1P6/8/8/8/8/r7/2R5 w - - 0 1',
        url: 'https://lichess.org/study/jgWiiJt2/2llsT8Gv'
    },
    
     {
        path: ['TdB Thématique', 'FINALES', 'Finales de Tours', '{RTP} vs {rt}', '{r} coupé verticalement', '{P} en 7e - {R} devant', 'Position de Lucena'],
        title: 'TdB21-5 : Frit - Iagar (Muret, 2025)',
        fen: '2K5/2P1k3/5pp1/4p2p/7P/6P1/3R1P2/1r6 w - - 1 1',
        url: 'https://lichess.org/study/jgWiiJt2/5cwCKoNX'
    },
    

     {
        path: ['TdB Thématique', 'FINALES', 'Finales de Tours', '{RTP} vs {rt}', '{r} coupé verticalement', '{P} en 7e - {R} devant', 'Défense Latérale - Règle de Ste Foy'],
        title: 'TdB28-4 : Arat - Özen (Izmir, 2017)',
        fen: '5r2/8/8/8/8/8/R3p1K1/4k3 w - - 0 1',
        url: 'https://lichess.org/study/P8VvH1zm/GsGBjEta'
    },
    
     {
        path: ['TdB Thématique', 'FINALES', 'Finales de Tours', '{RTP} vs {rt}', '{r} coupé verticalement', '{P} en 7e - {R} devant', 'Défense Latérale - Règle de Ste Foy'],
        title: 'TdB28-5 : Heinz - Müller (Fürth, 1999)',
        fen: '4KR2/r3P1k1/8/8/8/8/8/8 w - - 2 1',
        url: 'https://lichess.org/study/P8VvH1zm/anpKrQd7'
    },
    
     {
        path: ['TdB Thématique', 'FINALES', 'Finales de Tours', '{RTP} vs {rt}', '{r} coupé verticalement', '{P} en 7e - {R} devant', 'Défense Latérale - Règle de Ste Foy'],
        title: 'TdB28-6 : N.A. Kopaiev (Shakhmaty v SSSR, 1953)',
        fen: '2r2K1k/5P2/8/8/8/8/8/6R1 w - - 1 1',
        url: 'https://lichess.org/study/P8VvH1zm/EipLm1Qq'
    },


     {
        path: ['TdB Thématique', 'FINALES', 'Finales de Tours', '{RTP} vs {rt}', '{r} coupé verticalement', '{P} dans son camp - Règle des 5'],
        title: 'TdB24-4 : Timman - Tseshkovsky (Portoroz, 1979)',
        fen: '8/8/8/7r/1K1P4/6k1/4R3/8 w - - 0 1',
        url: 'https://lichess.org/study/oQq5Yf6f/lB722olm'
    },
    
     {
        path: ['TdB Thématique', 'FINALES', 'Finales de Tours', '{RTP} vs {rt}', '{r} coupé verticalement', '{P} dans son camp - Règle des 5'],
        title: 'TdB24-5 : Ostojic - Timman (Venise, 1974)',
        fen: '8/4k3/7R/3K1p1p/8/8/8/5r2 b - - 0 1',
        url: 'https://lichess.org/study/oQq5Yf6f/hFpjmFqg'
    },



// ------------------------------ Pion-Tour en 7e ----------

     {
        path: ['TdB Thématique', 'FINALES', 'Finales de Tours', '{RTP} vs {rt}', '{P}-Tour en 7e', '{T} devant le {P}', 'Défense du Triangle'],
        title: 'TdB13-4 : Moorehouse - Stephenson (London, Canada, 1995)',
        fen: '8/5k2/R7/8/8/5K2/p7/r7 w - - 0 1',
        url: 'https://lichess.org/study/9u4n3THl/BzutLgOk'
    },
    
     {
        path: ['TdB Thématique', 'FINALES', 'Finales de Tours', '{RTP} vs {rt}', '{P}-Tour en 7e', '{T} devant le {P}', 'Défense du Triangle'],
        title: 'TdB13-5 : Pogonina - Straub (Internet, 2004)',
        fen: '8/6p1/8/R4p1k/5P2/8/p5K1/r7 w - - 0 1',
        url: 'https://lichess.org/study/9u4n3THl/CMWxV6Uf'
    },


     {
        path: ['TdB Thématique', 'FINALES', 'Finales de Tours', '{RTP} vs {rt}', '{P}-Tour en 7e', '{T} devant le {P}', 'Défense par Ecran du {R}'],
        title: 'TdB14-4 : J. Berger (Theorie und Praxis der Endspiele, 1890)',
        fen: 'R7/P5K1/8/6k1/8/8/8/r7 w - - 0 1',
        url: 'https://lichess.org/study/6QVcrTwJ/hy8y3nfS'
    },
    
     {
        path: ['TdB Thématique', 'FINALES', 'Finales de Tours', '{RTP} vs {rt}', '{P}-Tour en 7e', '{T} devant le {P}', 'Défense par Ecran du {R}'],
        title: 'TdB14-5 : B. Marik (Ceskoslovensky Sach, 1953)',
        fen: 'R6K/P7/8/8/8/7k/8/r7 w - - 0 1',
        url: 'https://lichess.org/study/6QVcrTwJ/fcAQqEB9'
    },
    
     {
        path: ['TdB Thématique', 'FINALES', 'Finales de Tours', '{RTP} vs {rt}', '{P}-Tour en 7e', '{T} devant le {P}', 'Défense par Ecran du {R}'],
        title: 'TdB14-6 : Kolinski - Kuziemko (Kolobrzeg, 2009)',
        fen: '7R/7P/4pK2/8/4k3/8/8/6r1 b - - 0 1',
        url: 'https://lichess.org/study/6QVcrTwJ/ItxAt8Nm'
    },


     {
        path: ['TdB Thématique', 'FINALES', 'Finales de Tours', '{RTP} vs {rt}', '{P}-Tour en 7e', '{T} devant le {P}', 'Défense par Ecran de la {t}', 'Batterie {tr} éloignée du {P}'],
        title: 'TdB15-4 : N. Kopaiev & Y. Averbakh (Shakhmatnye Okonchaniya, 1958)',
        fen: 'R7/P2K4/7k/8/8/8/8/6r1 b - - 0 1',
        url: 'https://lichess.org/study/8i2iG3Uj/wHNn4v0e'
    },
    
     {
        path: ['TdB Thématique', 'FINALES', 'Finales de Tours', '{RTP} vs {rt}', '{P}-Tour en 7e', '{T} devant le {P}', 'Défense par Ecran de la {t}', 'Batterie {tr} éloignée du {P}'],
        title: 'TdB15-5 : Zaitsenkov - Logun (Tallinn, 2001)',
        fen: '8/8/8/5k2/8/2K5/3R3p/7r w - - 0 1',
        url: 'https://lichess.org/study/8i2iG3Uj/pUKRaujU'
    },
    
     {
        path: ['TdB Thématique', 'FINALES', 'Finales de Tours', '{RTP} vs {rt}', '{P}-Tour en 7e', '{T} devant le {P}', 'Défense par Ecran de la {t}', 'Batterie {tr} éloignée du {P}'],
        title: 'TdB15-6 : P. Romanovsky (Shakhmaty v SSSR, 1938)',
        fen: 'R7/P6r/8/1K6/8/8/7k/8 w - - 0 1',
        url: 'https://lichess.org/study/8i2iG3Uj/WQNJqBbJ'
    },

    
     {
        path: ['TdB Thématique', 'FINALES', 'Finales de Tours', '{RTP} vs {rt}', '{P}-Tour en 7e', '{T} devant le {P}', 'Défense par Ecran de la {t}', 'Batterie {tr} proche du {P}'],
        title: 'TdB16-4 : Tarrasch - Johner (Teplitz-Schönau, 1922)',
        fen: 'R7/P6r/8/3k4/8/2K5/8/8 b - - 0 1',
        url: 'https://lichess.org/study/7uiPAONy/Vz5hnzlv'
    },
    
     {
        path: ['TdB Thématique', 'FINALES', 'Finales de Tours', '{RTP} vs {rt}', '{P}-Tour en 7e', '{T} devant le {P}', 'Défense par Ecran de la {t}', 'Batterie {tr} proche du {P}'],
        title: 'TdB16-5 : Bodrogi - Torok (Budapest, 2009)',
        fen: '7R/3r3P/8/4k3/5p2/8/4K3/8 b - - 13 1',
        url: 'https://lichess.org/study/7uiPAONy/RUUewl4i'
    },
    
     {
        path: ['TdB Thématique', 'FINALES', 'Finales de Tours', '{RTP} vs {rt}', '{P}-Tour en 7e', '{T} devant le {P}', 'Défense par Ecran de la {t}', 'Batterie {tr} proche du {P}'],
        title: 'TdB16-6 : A. Chéron (La Fin de Partie : Une Tour et un Pion contre une Tour, 1923)',
        fen: 'R7/P1r5/8/8/8/8/8/K1k5 w - - 0 1',
        url: 'https://lichess.org/study/7uiPAONy/9kvgXJuc'
    },

     {
        path: ['TdB Thématique', 'FINALES', 'Finales de Tours', '{RTP} vs {rt}', '{P}-Tour en 7e', '{T} devant le {P}', 'Défense par Ecran de la {t}', 'Batterie {tr} proche du {P}'],
        title: 'TdB16-7 : A. Chéron (La Fin de Partie : Une Tour et un Pion contre une Tour, 1923)',
        fen: 'R7/P1r5/8/8/8/8/8/K1k5 b - - 0 1',
        url: 'https://lichess.org/study/7uiPAONy/eEE9XTcR'
    },

     {
        path: ['TdB Thématique', 'FINALES', 'Finales de Tours', '{RTP} vs {rt}', '{P}-Tour en 7e', '{T} devant le {P}', 'Défense par Ecran de la {t}', 'Batterie {tr} centrale'],
        title: 'TdB17-4 : Murshed - Serper (Dhaka, 1995)',
        fen: '8/3k4/8/8/3K4/8/p3R3/r7 w - - 7 1',
        url: 'https://lichess.org/study/ZKYpuooK/mF1hMLLD'
    },
    
     {
        path: ['TdB Thématique', 'FINALES', 'Finales de Tours', '{RTP} vs {rt}', '{P}-Tour en 7e', '{T} devant le {P}', 'Défense par Ecran de la {t}', 'Batterie {tr} centrale'],
        title: 'TdB17-5 : Ionescu - Gutman (Bienne, 1990)',
        fen: 'R7/P2r4/4k3/8/4K3/8/8/8 b - - 0 1',
        url: 'https://lichess.org/study/ZKYpuooK/pjtgfvgi'
    },
    
     {
        path: ['TdB Thématique', 'FINALES', 'Finales de Tours', '{RTP} vs {rt}', '{P}-Tour en 7e', '{T} devant le {P}', 'Défense par Ecran de la {t}', 'Batterie {tr} centrale'],
        title: 'TdB17-6 : J. Moravec (Československý Šach, 1931)',
        fen: '8/8/8/2k5/8/4K3/3R3p/7r w - - 0 1',
        url: 'https://lichess.org/study/ZKYpuooK/tEIajeFk'
    },



// -------------------- Finales de Dames ----------
// ------------------------- RD vs RD ----------
// ------------------------- RD vs RP ----------

     {
        path: ['TdB Thématique', 'FINALES', 'Finales de Dames', '{RD} vs {rd}'],
        title: 'TdB1-4 : J. de la Villa (Los 100 Finales que hay que saber, 2008)',
        fen: '8/6P1/8/8/5K2/8/6k1/7q w - - 0 1',
        url: 'https://lichess.org/study/KODwkcmn/PiG2BARS',
        marks: 'border:vert:g4,h4,h3,h2,h1,g1,g2,g3,f4,f3,f2,f1 piece=Qw:bleu:a2 arrow:bleu:a2>g2 piece=Kb:rouge:g2 piece=Kw:bleu:f4 piece=Qb:rouge:h1'
    },

     {
        path: ['TdB Thématique', 'FINALES', 'Finales de Dames', '{RD} vs {rd}'],
        title: 'TdB1-5 : Anand - Thipsay (Coimbatore, 1987)',
        fen: '2Q5/8/8/8/8/3K4/1k6/q7 w - - 0 1',
        url: 'https://lichess.org/study/KODwkcmn/rSkHGCBI',
        marks: 'border:vert:a3,b3,c3,d3,d2,d1,c1,b1,a1,a2,b2,c2 piece=Qw:bleu:b8 piece=Kw:bleu:d3 piece=Kw:rouge:b2 piece=Qb:rouge:a1 arrow:bleu:b8>b2'
    },


     {
        path: ['TdB Thématique', 'FINALES', 'Finales de Dames', '{RD} vs {rp}', '{p}-Fou en 6e'],
        title: 'TdB4-4 : I.A. Horowitz (How to Win in the Chess Endings, 1957)',
        fen: '8/5K1Q/8/8/8/2p5/8/k7 w - - 0 1',
        url: 'https://lichess.org/study/VdTzW3uu/17NA4Olt',
        marks: 'arrow:vert:h7>g7,g7>d4'
    },

     {
        path: ['TdB Thématique', 'FINALES', 'Finales de Dames', '{RD} vs {rp}', '{p}-Fou en 6e'],
        title: 'TdB4-5 : I.A. Horowitz (How to Win in the Chess Endings, 1957)',
        fen: '8/6KQ/8/8/8/2p5/8/k7 w - - 0 1',
        url: 'https://lichess.org/study/VdTzW3uu/HUFpWxed',
        marks: 'arrow:vert:h7>h6,h6>f6'
    },


     {
        path: ['TdB Thématique', 'FINALES', 'Finales de Dames', '{RD} vs {rp}', '{p}-Tour en 7e'],
        title: 'TdB12-4 : Hernando Rodrigo - Sorroche Martin (Vila de Salou, 1995)',
        fen: '6Q1/8/8/6K1/8/8/6kp/8 w - - 0 1',
        url: 'https://lichess.org/study/OsXJ1z73/zQo88krk'
    },

     {
        path: ['TdB Thématique', 'FINALES', 'Finales de Dames', '{RD} vs {rp}', '{p}-Tour en 7e'],
        title: 'TdB12-5 : Leentjens - Huizinga (Groningue, 2004)',
        fen: '8/2Q5/8/8/8/8/pk2K3/8 w - - 0 1',
        url: 'https://lichess.org/study/OsXJ1z73/LVtkaKDW'
    },
    
     {
        path: ['TdB Thématique', 'FINALES', 'Finales de Dames', '{RD} vs {rp}', '{p}-Tour en 7e'],
        title: 'TdB12-6 : A. Salvio (Trattato dell\'Inventione et Arte Liberale del Gioco di Scacchi, 1634)',
        fen: '8/1QK5/8/8/8/8/p7/k7 w - - 0 1',
        url: 'https://lichess.org/study/OsXJ1z73/PAArBalA'
    },

    
     {
        path: ['TdB Thématique', 'FINALES', 'Finales de Dames', '{RD} vs {rp}', '{p}-Fou en 7e', '{r} du petit côté'],
        title: 'TdB19-4 : Seidemann - Jahn (Eilenbourg, 1984)',
        fen: '8/1qk2PK1/8/8/8/8/8/8 b - - 0 1',
        url: 'https://lichess.org/study/NbcTHbc2/df4cMHv4'
    },

     {
        path: ['TdB Thématique', 'FINALES', 'Finales de Dames', '{RD} vs {rp}', '{p}-Fou en 7e', '{r} du petit côté'],
        title: 'TdB19-5 : Sundell - von Bahr (Haninge, 1997)',
        fen: '6K1/5P2/8/4q3/6k1/8/8/8 b - - 0 1',
        url: 'https://lichess.org/study/NbcTHbc2/CAIH2BYr'
    },
    

     {
        path: ['TdB Thématique', 'FINALES', 'Finales de Dames', '{RD} vs {rp}', '{p}-Fou en 7e', '{r} du grand côté'],
        title: 'TdB20-4 : Soubirou - Neuhauser (Aix-les Bains, 2009)',
        fen: '8/2P5/3K4/8/1k6/8/8/q7 b - - 0 1',
        url: 'https://lichess.org/study/T8YLWdU5/aD6QwSbf'
    },

     {
        path: ['TdB Thématique', 'FINALES', 'Finales de Dames', '{RD} vs {rp}', '{p}-Fou en 7e', '{r} du grand côté'],
        title: 'TdB20-5 : Schlender - Trzaska (Ruhrgebiet, 1997)',
        fen: '8/5P2/5K2/1k6/8/6q1/8/8 b - - 0 1',
        url: 'https://lichess.org/study/T8YLWdU5/xMao6akU'
    },
    


// -------------------- Finales de Pièces ----------

// ------------------------- RD vs RT ----------

 {
        path: ['TdB Thématique', 'FINALES', 'Finales de Pièces', '{RD} vs {rt}', 'Position de Philidor'],
        title: 'TdB29-5 : F.A.D. Philidor (Analyse du Jeu des Echecs, 1777)',
        fen: '1k6/1r6/2K5/Q7/8/8/8/8 w - - 0 1',
        url: 'https://lichess.org/study/yt4sMM6g/CmsXcnuv'
    },
    


// ------------------------- RTF vs RT ----------


 {
        path: ['TdB Thématique', 'FINALES', 'Finales de Pièces', '{RTF} vs {rt}', 'Position de Philidor'],
        title: 'TdB29-6 : F.A.D. Philidor (Analyse du Jeu des Echecs, 1749)',
        fen: '3k4/4r3/3K4/3B4/8/8/8/5R2 w - - 0 1',
        url: 'https://lichess.org/study/yt4sMM6g/IHfXzHFB'
    },
    




    
// ---------- ETUDES ----------

// -------------- Finales ----------
// -------------------- Finales de Pions ----------


 {
        path: ['TdB Thématique', 'ETUDES', 'Finales', 'Finales de Pions', 'Le Contournement de Drtina'],
        title: 'TdB3-4 : J. Drtina (Casopis Ceskych Sachistu, 1908)',
        fen: '5k2/8/8/8/8/2P5/8/3K4 w - - 0 1',
        url: 'https://lichess.org/study/uMLLix2a/2YIcxk9x',
        marks: 'border:vert:b8,b7,b6,b5,c5,d5,d6,d7,d8,c8,c7,c6 disc:vert:b5,c5,d5 text=1:bleu:c4 text=1:rouge:c6 label=2a:bleu:b4 label=2a:rouge:b6 label=2b:rouge:d6 label=2b:bleu:d4 disc:vert:e5,f5,g5,h5,a5 text=3:cyan:a4 text=3:rose:a6 text=4:rose:e6 text=5:rose:f6 text=6:rose:g6 text=7:rose:h6 text=7:cyan:h4 text=6:cyan:g4 text=5:cyan:f4 text=4:cyan:e4'
    },

 {
        path: ['TdB Thématique', 'ETUDES', 'Finales', 'Finales de Pions', 'L\’Enfilade de Cohn'],
        title: 'TdB19-6 : H. Cohn (Morgen-Zeitung, 1928)',
        fen: '8/8/8/1p2k3/4q3/4R1K1/8/8 w - - 0 1',
        url: 'https://lichess.org/study/NbcTHbc2/mSG4ShIf'
    },

 {
        path: ['TdB Thématique', 'ETUDES', 'Finales', 'Finales de Pions', 'Le Trébuchet de Durand'],
        title: 'TdB5-4 : P.A. Durand (La Régence, 1860)',
        fen: '8/8/1k1p4/3P1K2/8/8/8/8 w - - 0 1',
        url: 'https://lichess.org/study/RTIUJ9IG/GabMVrOq',
        marks: 'border:vert:d6,e6,f6,g6,g7,g8,f7,f8,e8,e7,d7,d8,c6,b6,a6,a7,a8,b8,c8,c7,b7 border:bleu:e6 border:rouge:c5 label=ZZ:rouge:c5 label=ZZ:bleu:e6 arrow:vert:f5>f6'
    },

 {
        path: ['TdB Thématique', 'ETUDES', 'Finales', 'Finales de Pions', 'Le Trébuchet de Durand'],
        title: 'TdB5-5 : P.A. Durand (La Régence, 1860)',
        fen: '8/8/8/1k1p4/3P1K2/8/8/8 w - - 0 1',
        url: 'https://lichess.org/study/RTIUJ9IG/DlvmEGhk',
        marks: 'border:vert:g5,g6,g7,f7,e7,d7,c7,b7,a7,a6,a5,b5,c5,b6,c6,d6,e6,f6,d5,e5,f5 border:bleu:e5 box:rouge:c4 label=ZZ:rouge:c4 label=ZZ:bleu:e5'
    },

 {
        path: ['TdB Thématique', 'ETUDES', 'Finales', 'Finales de Pions', 'La Transposition de Fahrni'],
        title: 'TdB9-6 : H. Fahrni (Das Endspiel im Schach, 1917)',
        fen: 'k1N5/2p5/8/1P6/8/8/6K1/8 w - - 8 1',
        url: 'https://lichess.org/study/p2znRfiY/JEaGCFjU'
    },

 {
        path: ['TdB Thématique', 'ETUDES', 'Finales', 'Finales de Pions', 'Le Contournement de Dedrle'],
        title: 'TdB11-6 : F. Dedrle (Deutsches Wochenschach, 1921)',
        fen: '8/4k3/3p4/3P4/2P5/8/8/5K2 w - - 11 1',
        url: 'https://lichess.org/study/qwVCWJlT/YszQUMO1'
    },

 {
        path: ['TdB Thématique', 'ETUDES', 'Finales', 'Finales de Pions', 'Le Rempart de Buijs & Hendriks'],
        title: 'TdB18-4 : J. Buijs & R. Hendriks (Spiegelen Springen Schuiven Draaien, 1993)',
        fen: '8/8/8/4k3/6pP/6P1/K7/8 w - - 0 1',
        url: 'https://lichess.org/study/jXpZv9Ui/gWdxns2o',
        marks: 'border:vert:f4,e4,d4,d5,d6,d7,e7,f7,g7,h7,h6,h5,g5,f5,e5,e6,f6,g6 cross:bleu:f4,g5 cross:rouge:f3 text=1:rouge:e5 text=2:rouge:d5 text=3:rouge:e4 text=4:rouge:d4 text=5:rouge:e6 text=6:rouge:d6 text=7:rouge:e7 text=8:rouge:d7 text=9:rouge:f6 text=10:rouge:g6 text=11:rouge:h6 text=11:bleu:h8 text=10:bleu:g8 text=9:bleu:f8 text=5:bleu:e8 text=6:bleu:d8,b8,b6 text=5:bleu:c8,c6 text=7:bleu:c7 text=8:bleu:b7 text=1:bleu:c5,c3,e3 text=2:bleu:d3,b5,b3 text=3:bleu:c4 text=4:bleu:b4 label=1%27:bleu:a3 label=3%27:bleu:a4 label=1%27:bleu:a5 label=5%27:bleu:a6 label=7%27:bleu:a7 label=5%27:bleu:a8'
    },

 {
        path: ['TdB Thématique', 'ETUDES', 'Finales', 'Finales de Pions', 'L\’Anti-Oppodition de Dedrle'],
        title: 'TdB18-5 : F. Dedrle (Studie, 1925)',
        fen: '8/2k5/8/8/Pp6/1P6/6K1/8 b - - 0 1',
        url: 'https://lichess.org/study/jXpZv9Ui/3vjTiAKd',
        marks: 'border:vert:b4,c4,d4,e4,e5,e6,e7,d7,c7,b7,a7,a6,a5,b5,c5,d5,d6,c6,b6 cross:rouge:c3 cross:bleu:b5,c4 text=1:bleu:d3 text=2:bleu:e3 text=1:bleu:f3,f5 text=2:bleu:g3,g5 text=2:rouge:e5 text=1:rouge:d5 text=3:rouge:d4 text=4:rouge:e4 text=6:rouge:e6 text=5:rouge:d6 text=7:rouge:d7 text=8:rouge:e7 text=9:rouge:c6 text=10:rouge:b6 text=11:rouge:a6 text=3:bleu:f4 text=4:bleu:g4 text=5:bleu:f6 text=6:bleu:g6 text=7:bleu:f7 text=8:bleu:g7 text=6:bleu:g8 text=5:bleu:f8 text=6:bleu:e8 text=5:bleu:d8 text=9:bleu:c8 text=10:bleu:b8 text=11:bleu:a8 label=1%27:bleu:h3,h5 label=3%27:bleu:h4 label=5%27:bleu:h6 label=7%27:bleu:h7 label=5%27:bleu:h8'
    },

 {
        path: ['TdB Thématique', 'ETUDES', 'Finales', 'Finales de Pions', 'Le Rempart de Bianchetti'],
        title: 'TdB18-6 : R. Bianchetti (Contributo alla Teoria dei Finali di soli Pedoni, 1925)',
        fen: '8/8/1p6/pP6/8/K7/8/k7 w - - 0 1',
        url: 'https://lichess.org/study/jXpZv9Ui/OZ2yCq8F',
        marks: 'border:orange:c5,d5,e5,e4,b5,a4,b4,c4,d4,e3,e2,d2,c2,b2,a2,a3,b3,c3,d3 cross:rouge:b4,c5 cross:bleu:c6 text=3:bleu:d5 text=4:bleu:e5 text=1:bleu:d4 text=2:bleu:e4 text=5:bleu:d3 text=6:bleu:e3 text=7:bleu:d2 text=8:bleu:e2 text=9:bleu:c3 text=10:bleu:b3 text=11:bleu:a3 text=11:rouge:a1 text=10:rouge:b1 text=9:rouge:c1 text=5:rouge:d1 text=6:rouge:e1 text=5:rouge:f1 text=6:rouge:g1,g3 text=5:rouge:f3 text=7:rouge:f2 text=8:rouge:g2 text=1:rouge:f4 text=2:rouge:g4 text=3:rouge:f5 text=4:rouge:g5 text=1:rouge:d6 text=2:rouge:e6,g6 text=1:rouge:f6 label=1%27:rouge:h6,h4 label=3%27:rouge:h5 label=5%27:rouge:h3 label=7%27:rouge:h2 label=5%27:rouge:h1'
    },

 {
        path: ['TdB Thématique', 'ETUDES', 'Finales', 'Finales de Pions', 'Le Dilemme de Bähr'],
        title: 'TdB27-6 : W. Bähr (Der Alemanne, 1935)',
        fen: '8/4k3/p7/P6p/7P/5K2/8/8 w - - 0 1',
        url: 'https://lichess.org/study/JxGoy3cj/Y30JRuQa'
    },

 {
        path: ['TdB Thématique', 'ETUDES', 'Finales', 'Finales de Pions', 'Le Triangle de Joseph'],
        title: 'TdB5-6 : D. Joseph (British Chess Magazine, 1922)',
        fen: '3K4/kp6/p7/1P6/8/8/7P/8 w - - 0 1',
        url: 'https://lichess.org/study/RTIUJ9IG/ALRn0M33',
        marks: 'arrow:vert:b5>b6 piece=Qb:rouge:a1 arrow:bleu:h8>g8,g8>e8,e8>e5,e5>h8 piece=Qw:bleu:h8'
    },

 {
        path: ['TdB Thématique', 'ETUDES', 'Finales', 'Finales de Pions', 'Le Rouleau compresseur de Kling & Horwitz'],
        title: 'TdB20-6 : J. Kling & B. Horwitz (Chess Studies, 1851)',
        fen: '8/8/8/2p5/2Pp4/3K2Pk/7P/8 w - - 0 1',
        url: 'https://lichess.org/study/T8YLWdU5/KIeqQiSN'
    },

 {
        path: ['TdB Thématique', 'ETUDES', 'Finales', 'Finales de Pions', 'Les Cases minées de Philidor'],
        title: 'TdB29-4 : F.A.D. Philidor (Analyse du Jeu des Echecs, 1777)',
        fen: '8/8/4p3/2p2k2/2P1p1p1/6P1/5K2/8 w - - 0 1',
        url: 'https://lichess.org/study/yt4sMM6g/DwMOq9yg'
    },

    {
        path: ['TdB Thématique', 'ETUDES', 'Finales', 'Finales de Pions', 'La Conjugaison d\'Ebersz'],
        title: 'TdB-HS3 : K. Ebersz (Magyar Sakkvilág, 1930)',
        fen: '6k1/1p6/1P1p4/3p4/3Pp2p/4P2p/1K5P/8 w - - 0 1'
    },


// -------------------- Finales de Pièces Mineures ----------


 {
        path: ['TdB Thématique', 'ETUDES', 'Finales', 'Finales de Pièces Mineures', 'Le Carrousel de Levitt'],
        title: 'TdB2-5 : J. Levitt (1997)',
        fen: '7K/8/8/8/7N/7p/8/7k w - - 0 1',
        url: 'https://lichess.org/study/jtsBgg9o/qNwXThkA',
        marks: 'circle:vert:h2,g4,e3,f1'
    },
    
 {
        path: ['TdB Thématique', 'ETUDES', 'Finales', 'Finales de Pièces Mineures', 'La Transposition de Fahrni'],
        title: 'TdB9-6 : H. Fahrni (Das Endspiel im Schach, 1917)',
        fen: 'k1N5/2p5/8/1P6/8/8/6K1/8 w - - 8 1',
        url: 'https://lichess.org/study/p2znRfiY/JEaGCFjU'
    },

 {
        path: ['TdB Thématique', 'ETUDES', 'Finales', 'Finales de Pièces Mineures', 'L\'Aller-Retour de Sarychev'],
        title: 'TdB4-6 : A. & K. Sarychev (Shakhmatny Listok, 1928)',
        fen: '8/1pPK3b/8/8/8/5k2/8/8 w - - 0 1',
        url: 'https://lichess.org/study/VdTzW3uu/ouwApKAx',
        marks: 'arrow2:vert:d7>c8'
    },

 {
        path: ['TdB Thématique', 'ETUDES', 'Finales', 'Finales de Pièces Mineures', 'Le Carrousel de Centurini'],
        title: 'TdB7-6 : L. Centurini (La Régence, 1856)',
        fen: '2KB4/1P6/2k5/8/8/8/7b/8 w - - 12 1',
        url: 'https://lichess.org/study/j6Q6uKTU/KdoyUr3T'
    },

 {
        path: ['TdB Thématique', 'ETUDES', 'Finales', 'Finales de Pièces Mineures', 'L\'Interception de Heuäcker'],
        title: 'TdB10-6 : P. Heuäcker (Neue Freie Presse, 1930)',
        fen: '1B6/8/7P/4p3/3b3k/8/8/2K5 w - - 12 1',
        url: 'https://lichess.org/study/5ftHnQkJ/uHUY8MBf'
    },



// -------------------- Finales de Tours ----------


 {
        path: ['TdB Thématique', 'ETUDES', 'Finales', 'Finales de Tours', 'L\'Echelle de Saavedra'],
        title: 'TdB2-6 : F. Saavedra / G .E. Barbier (Glasgow Weekly Citizen, 1895)',
        fen: '8/8/1KP5/3r4/8/8/8/k7 w - - 0 1',
        url: 'https://lichess.org/study/jtsBgg9o/rnfGaUJn',
        marks: 'arrow:vert:c6>c8 piece=Rw:vert:c8'
    },

 {
        path: ['TdB Thématique', 'ETUDES', 'Finales', 'Finales de Tours', 'Le Couloir de Moravec'],
        title: 'TdB8-4 : J. Moravec (28 Rijen, 1924)',
        fen: '8/k7/2K5/8/8/8/6pp/1R6 w - - 0 1',
        url: 'https://lichess.org/study/Iofs72fq/N6Nou8GA'
    },

 {
        path: ['TdB Thématique', 'ETUDES', 'Finales', 'Finales de Tours', 'Le Zugzwang de Kling & Horwitz'],
        title: 'TdB8-5 : J. Kling & B. Horwitz (Chess Studies, 1851)',
        fen: '8/8/5K2/7k/8/p7/1p6/1R6 w - - 9 1',
        url: 'https://lichess.org/study/Iofs72fq/j2ftbp46'
    },

 {
        path: ['TdB Thématique', 'ETUDES', 'Finales', 'Finales de Tours', 'Le Zugzwang de Schapiro'],
        title: 'TdB8-6 : M. Schapiro (Rheinische Volkswacht, 1920)',
        fen: '8/8/8/3R4/2K5/6pp/k7/8 w - - 0 1',
        url: 'https://lichess.org/study/Iofs72fq/bgHeSJAX'
    },

 {
        path: ['TdB Thématique', 'ETUDES', 'Finales', 'Finales de Tours', 'L\'Ecran de Berger'],
        title: 'TdB14-4 : J. Berger (Theorie und Praxis der Endspiele, 1890)',
        fen: 'R7/P5K1/8/6k1/8/8/8/r7 w - - 0 1',
        url: 'https://lichess.org/study/6QVcrTwJ/hy8y3nfS'
    },

 {
        path: ['TdB Thématique', 'ETUDES', 'Finales', 'Finales de Tours', 'L\'Ecran de Marik/Troitzky'],
        title: 'TdB14-5 : B. Marik (Ceskoslovensky Sach, 1953)',
        fen: 'R6K/P7/8/8/8/7k/8/r7 w - - 0 1',
        url: 'https://lichess.org/study/6QVcrTwJ/fcAQqEB9'
    },

 {
        path: ['TdB Thématique', 'ETUDES', 'Finales', 'Finales de Tours', 'Le Zugzwang de Romanovsky'],
        title: 'TdB15-6 : P. Romanovsky (Shakhmaty v SSSR, 1938)',
        fen: 'R7/P6r/8/1K6/8/8/7k/8 w - - 0 1',
        url: 'https://lichess.org/study/8i2iG3Uj/WQNJqBbJ'
    },

 {
        path: ['TdB Thématique', 'ETUDES', 'Finales', 'Finales de Tours', 'Le Zugzwang de Chéron'],
        title: 'TdB16-6 : A. Chéron (La Fin de Partie : Une Tour et un Pion contre une Tour, 1923)',
        fen: 'R7/P1r5/8/8/8/8/8/K1k5 w - - 0 1',
        url: 'https://lichess.org/study/7uiPAONy/9kvgXJuc'
    },

 {
        path: ['TdB Thématique', 'ETUDES', 'Finales', 'Finales de Tours', 'Le Zugzwang de Chéron'],
        title: 'TdB16-7 : A. Chéron (La Fin de Partie : Une Tour et un Pion contre une Tour, 1923)',
        fen: 'R7/P1r5/8/8/8/8/8/K1k5 b - - 0 1',
        url: 'https://lichess.org/study/7uiPAONy/eEE9XTcR'
    },

 {
        path: ['TdB Thématique', 'ETUDES', 'Finales', 'Finales de Tours', 'Le Zugzwang central de Moravec'],
        title: 'TdB17-6 : J. Moravec (Československý Šach, 1931)',
        fen: '8/8/8/2k5/8/4K3/3R3p/7r w - - 0 1',
        url: 'https://lichess.org/study/ZKYpuooK/tEIajeFk'
    },

 {
        path: ['TdB Thématique', 'ETUDES', 'Finales', 'Finales de Tours', 'L\'Escalier de Kopaïev'],
        title: 'TdB28-6 : N.A. Kopaiev (Shakhmaty v SSSR, 1953)',
        fen: '5K1k/5P2/8/8/8/8/2r5/6R1 b - - 0 1',
        url: 'https://lichess.org/study/P8VvH1zm/EipLm1Qq'
    },

 {
        path: ['TdB Thématique', 'ETUDES', 'Finales', 'Finales de Tours', 'Le Carré de Lasker'],
        title: 'TdB3-6 : Lasker (Deutches Wochenschach und Berliner Schachzeitung, 1890)',
        fen: '2K5/2P4R/k7/8/8/8/2r4p/8 w - - 0 1',
        url: 'https://lichess.org/study/uMLLix2a/Pov1DVKh',
        marks: 'arrow:vert:h7>h6,h6>h5,h5>h4,h4>h3,h3>h2'
    },



// -------------------- Finales de Dames ----------


 {
        path: ['TdB Thématique', 'ETUDES', 'Finales', 'Finales de Dames', 'L\'Ecran de Salvio'],
        title: 'TdB12-6 : A. Salvio (Trattato dell\'Inventione et Arte Liberale del Gioco di Scacchi, 1634)',
        fen: '8/1QK5/8/8/8/8/p7/k7 w - - 0 1',
        url: 'https://lichess.org/study/OsXJ1z73/PAArBalA'
    },

 {
        path: ['TdB Thématique', 'ETUDES', 'Finales', 'Finales de Dames', 'L\'Attaque indirecte d\'Horowitz'],
        title: 'TdB4-5 : I.A. Horowitz (How to Win in the Chess Endings, 1957)',
        fen: '8/6KQ/8/8/8/2p5/8/k7 w - - 0 1',
        url: 'https://lichess.org/study/VdTzW3uu/HUFpWxed',
        marks: 'arrow:vert:h7>h6,h6>f6'
    },

 {
        path: ['TdB Thématique', 'ETUDES', 'Finales', 'Finales de Dames', 'Le Triangle de Joseph'],
        title: 'TdB5-6 : D. Joseph (British Chess Magazine, 1922)',
        fen: '3K4/kp6/p7/1P6/8/8/7P/8 w - - 0 1',
        url: 'https://lichess.org/study/RTIUJ9IG/ALRn0M33',
        marks: 'arrow:vert:b5>b6 piece=Qb:rouge:a1 arrow:bleu:h8>g8,g8>e8,e8>e5,e5>h8 piece=Qw:bleu:h8'
    },



    

// -------------------- Finales de Pièces ----------


 {
        path: ['TdB Thématique', 'ETUDES', 'Finales', 'Finales de Pièces', 'La Position de Philidor {D} vs {t}'],
        title: 'TdB29-5 : F.A.D. Philidor (Analyse du Jeu des Echecs, 1777)',
        fen: '1k6/1r6/2K5/Q7/8/8/8/8 w - - 0 1',
        url: 'https://lichess.org/study/yt4sMM6g/CmsXcnuv'
    },

 {
        path: ['TdB Thématique', 'ETUDES', 'Finales', 'Finales de Pièces', 'La Position de Philidor {TF} vs {t}'],
        title: 'TdB29-6 : F.A.D. Philidor (Analyse du Jeu des Echecs, 1749)',
        fen: '3k4/4r3/3K4/3B4/8/8/8/5R2 w - - 0 1',
        url: 'https://lichess.org/study/yt4sMM6g/IHfXzHFB'
    },




// -------------- Thèmes tactiques ----------



    {
        path: ['TdB Thématique', 'ETUDES', 'Thèmes tactiques', 'L\'Escalier de Mouterde (Interception)'],
        title: 'TdB1-6 : A. Mouterde (La Stratégie, 1922)',
        fen: '3kr2q/6Q1/8/8/8/4R3/8/K7 w - - 0 1',
        url: 'https://lichess.org/study/KODwkcmn/bc7SQG59',
        marks: 'arrow:rouge:h8>a1 piece=Rw:bleu:c3 piece=Qw:bleu:b2'
    },

    {
        path: ['TdB Thématique', 'ETUDES', 'Thèmes tactiques', 'La Prison de Polerio (Attraction)'],
        title: 'TdB6-6 : G.C. Polerio (L\'elegantia, sottilità, verità ..., 1595?)',
        fen: '8/8/6p1/7p/7P/8/pk1K4/2R5 w - - 0 1',
        url: 'https://lichess.org/study/pPDqTYSi/NrqcKHm4',
        marks: 'arrow:vert:c1>a1 arrow:bleu:d2>c2'
    },

    {
        path: ['TdB Thématique', 'ETUDES', 'Thèmes tactiques', 'La Der de Timman (Attraction)'],
        title: 'TdB24-6 : J. Timman (De Telegraaf, 2025)',
        fen: 'r3k3/1pp1p3/4K2P/8/1R4N1/8/p7/7B w q - 0 1',
        url: 'https://lichess.org/study/oQq5Yf6f/A8uHbQdY'
    },

    {
        path: ['TdB Thématique', 'ETUDES', 'Thèmes tactiques', 'Le Double Novotny de Troitzky'],
        title: 'TdB25-6 : A. Troitzky (Magyar Sakkvilág, 1935)',
        fen: '3k4/3p4/P2P2P1/p1p1P3/K3p3/3P3B/P3p2P/3N3b w - - 0 1',
        url: 'https://lichess.org/study/TOpdMfob/TkHdqiNB'
    },

    {
        path: ['TdB Thématique', 'ETUDES', 'Thèmes tactiques', 'Les Fourchettes de Somov Nasimovitch'],
        title: 'TdB13-6 : E. Somov Nasimovitch (64, 1927)',
        fen: 'k1N4K/2R5/8/8/8/8/1p5P/8 w - - 0 1',
        url: 'https://lichess.org/study/9u4n3THl/pgoJtKiH'
    },

    {
        path: ['TdB Thématique', 'ETUDES', 'Thèmes tactiques', 'Les Fourchettes de Kaminer'],
        title: 'TdB21-6 : S.M. Kaminer (Trud, 1935)',
        fen: '8/1p4kP/4pbpN/8/P3q3/6P1/7Q/3K4 w - - 0 1',
        url: 'https://lichess.org/study/jgWiiJt2/xRsjPjcu'
    },

    {
        path: ['TdB Thématique', 'ETUDES', 'Thèmes tactiques', 'Les Clouages de Chéron'],
        title: 'TdB22-6 : A. Chéron (Journal de Genève, 1974)',
        fen: '8/8/8/8/7r/1R3pk1/8/6K1 w - - 0 1',
        url: 'https://lichess.org/study/XaOMRNIC/8wvpGLS8'
    },

    {
        path: ['TdB Thématique', 'ETUDES', 'Thèmes tactiques', 'Le Double Clouage en Croix de Troitzky'],
        title: 'TdB26-6 : A. Troitzky (L\'Echiquier, 1930)',
        fen: '1q6/2b2p1p/7k/8/1p1Q4/8/1K3B2/8 w - - 0 1',
        url: 'https://lichess.org/study/pbBvlKwx/Jx4gMz9o'
    },

    {
        path: ['TdB Thématique', 'ETUDES', 'Thèmes tactiques', 'Les Enfilades de Rinck'],
        title: 'TdB23-6 : H. Rinck (Deutsche Schachzeitung, 1903)',
        fen: '6q1/6p1/2k4p/R6B/p7/8/2P3P1/2K5 w - - 0 1',
        url: 'https://lichess.org/study/B4rB3ELK/p6eiynwE'
    },




// -------------- Hors-Séries ----------


    {
        path: ['TdB Thématique', 'ETUDES', 'Hors-Séries', 'La Double Triangulation de Bláthy'],
        title: 'TdB-HS2 : O.T. Bláthy (Vielzügige Schachaufgaben, 1890)',
        fen: 'N3k1nR/p1p1Pp2/2P1pPr1/b2pP3/P1pP1K2/2P3p1/6P1/8 w - - 0 1'
    },

    {
        path: ['TdB Thématique', 'ETUDES', 'Hors-Séries', 'La Conjugaison d\'Ebersz'],
        title: 'TdB-HS3 : K. Ebersz (Magyar Sakkvilág, 1930)',
        fen: '6k1/1p6/1P1p4/3p4/3Pp2p/4P2p/1K5P/8 w - - 0 1'
    },

    {
        path: ['TdB Thématique', 'ETUDES', 'Hors-Séries', 'Le Roque de Smullyan (Après Fc4, les Noirs peuvent-ils roquer ?)'],
        title: 'TdB-HS1 : R. Smullyan (The Chess Mysteries of Sherlock Holmes, 1980)',
        fen: 'r3k3/ppp3pp/6p1/P2Kp2P/1NB5/p5P1/PP3PP1/R7 b KQkq - 0 1'
    },






    {
        path: ['TdB Thématique', 'ETUDES', 'Finales', 'Finales de Pions', 'Les Cases minées de Philidor'],
        title: 'TdB19-6 : ',
        fen: ''
    },
 
    {
        path: ['TdB Thématique', 'ETUDES', 'Finales', 'Finales de Pions', 'Les Cases minées de Philidor'],
        title: 'TdB19-6 : ',
        fen: ''
    },





// -------------------- Finales de Pièces Mineures ----------
// -------------------- Finales de Tours ----------
// -------------------- Finales de Dames ----------
// -------------------- Finales de Pièces ----------
// -------------- Thèmes Tactiques ----------
// -------------- Hors-Séries ----------
 







    {
        path: ['TdB Thématique', 'FINALES', 'Finales de Pions', 'Pions bloqués'],
        title: 'Ebersz (Magyar Sakkvilag, 1930)',
        fen: '8/1p5k/1P1p4/3p4/3Pp2p/2K1P2p/7P/8 w - - 0 1'
    },

    {
        path: ['TdB Thématique', 'FINALES', 'Finales de Pions', 'Pions bloqués'],
        title: 'Ebersz (Magyar Sakkvilag, 1930)',
        fen: '7k/p7/P2p4/P2Pp3/4P3/4P1p1/6P1/K7 w - - 0 1'
    },

    {
        path: ['TdB Thématique', 'FINALES', 'Finales de Pions', 'Pions bloqués'],
        title: 'Zinar (Shakhmatnye Okonchaniya: Peshechnye, 1983)',
        fen: '5k2/1p6/pP2p3/Pp2P3/1P2P1p1/1K4P1/8/8 w - - 0 1'
    },

    {
        path: ['TdB Thématique', 'FINALES', 'Finales de Pions', 'Pions bloqués'],
        title: 'Bähr (Opposition und Kritische Felder im Bauernendspiel, 1936)',
        fen: '8/1p5k/1P2p3/1P2P3/4P1p1/5pP1/5P2/1K6 w - - 0 1'
    },

    {
        path: ['TdB Thématique', 'FINALES', 'Finales de Pions', 'Pions bloqués'],
        title: 'Zinar (Shakhmatnye Okonchaniya: Peshechnye, 1983)',
        fen: '8/1p5k/1P2p3/1P2P3/4P1p1/5pP1/K4P2/8 w - - 0 1'
    },

    {
        path: ['TdB Thématique', 'FINALES', 'Finales de Pions', 'Pions bloqués'],
        title: 'Bianchetti (L\'Italia Scacchistica, 1925)',
        fen: '7k/1p6/1P2p3/1P2P3/4P1p1/6P1/8/K7 w - - 0 1'
    },

   
];
