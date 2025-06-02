// Lire le fichier
import {isNil} from "ramda";

import * as R from "ramda";
import fs from 'fs-extra';


const filePPinit = 'text_source/petit_prince_utf8.txt';
const contentPPinint = fs.readFileSync(filePPinit, 'utf8');
const fileRMinit = 'text_source/rapport_minoritaire_utf8.txt';
const contentRMinint = fs.readFileSync(fileRMinit, 'utf8');
const fileCGinit = 'text_source/les_contes_grimm_utf8.txt';
const contentCGinint = fs.readFileSync(fileCGinit, 'utf8');


// On nettoie le texte : enlever "- " pour le petit prince
const nettoyerTirets = R.replace(/- /g, '');
const texteSepparePP = nettoyerTirets(contentPPinint);

const preprocess = R.pipe(
    R.toLower,
    R.replace(/['-]/g, ' '), // on change les ' et - par des espaces
    R.replace(/[^a-zàâçéèêëîïôûùæœ\s]/g, ''), // on enlève les caractères autres que lettre et espaces
    R.replace(/\s+/g, ' ')// tous espaces multiples deviennent simples
);

const cleanPP = preprocess(texteSepparePP);
const cleanRM = preprocess(contentRMinint);
const cleanCG = preprocess(contentCGinint);


//On fusionne les textes en s’assurant d’un seul espace entre eux
const texteFusionne = [cleanPP, cleanRM, cleanCG]
    .map(R.trim)                 // on enlève les espaces en début/fin de chaque texte
    .join(' ')                   // on fusionne avec un seul espace

fs.writeFileSync('text_source/corpus_fusionne.txt', texteFusionne, 'utf8');