import * as R from "ramda";
import fs from "fs-extra";

const texteFusionne = fs.readFileSync('text_source/corpus_fusionne.txt', 'utf8');
const letters = text => R.split('', text);
const test = letters(texteFusionne);

const groupement = (k, lettersArr) =>
    R.pipe(
        R.addIndex(R.map)((_, i, arr) =>
            i + k < arr.length ? [ arr.slice(i, i + k).join(''), arr[i + k] ] : null
        ),
        R.reject(R.isNil)
    )(lettersArr);
const buildCounts = (k, lettersArr) =>
    R.pipe(
        groupement.bind(null, k),
        R.groupBy(R.head),
        R.map(
            R.pipe(
                R.pluck(1),
                R.countBy(R.identity)
            )
        )
    )(lettersArr);
const proba = counts =>
    R.map(
        letterCountObj => {
            const total = R.sum(R.values(letterCountObj));
            return R.map(count => count / total, letterCountObj);
        },
        counts
    );

const ProbaTotalO1 = proba(buildCounts(1,letters(texteFusionne)));
const ProbaTotalO2 = proba(buildCounts(2,letters(texteFusionne)));
const Chosirlettre = (lettre, ProbaTotal) => R.prop(lettre)(ProbaTotal);

//Affichage


import readline from 'readline';

// on instantie tout pour "communiquer" avec l'utilisateur
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const isOnlyLetters = str => /^[a-zàâçéèêëîïôûùæœ]+$/.test(str);
const countLetters = str => str.length;
const isValidLength = len => len >= 1 && len <= 2;

//On demande à l'utilisateur de rentrer 1/2 lettre(s) en faisant les vérifications
function askInput(callback) {
    rl.question("Entrez 1 à 2 lettre(s) : ", (input) => {
        const cleanInput = R.pipe(R.trim, R.toLower)(input);
        //on vérifie qu'on entre que des lettres (pas de chiffres ou d'espaces)
        if (!isOnlyLetters(cleanInput)) {
            console.log("Erreur : veuillez n'entrer que des lettres.");
            return askInput(callback);
        }
        //on vérifie qu'il n'y a que 1 ou 2 lettres
        const lettersCount = countLetters(cleanInput);
        if (!isValidLength(lettersCount)) {
            console.log("Erreur : le nombre de lettres doit être entre 1 et 2.");
            return askInput(callback);
        }

        //Si tout fonctionne : let's go !!!!
        console.log("Entrée valide :", cleanInput);
        rl.close();

        callback(cleanInput);
    });
}


let userInput;

askInput((value) => {
    userInput = value;
    let result = {};
    if(R.length(userInput)===1){
        result = Chosirlettre(userInput,ProbaTotalO1);
    }
    if(R.length(userInput)===2){
        result = Chosirlettre(userInput,ProbaTotalO2);
    }
    console.log("Probabilité d'apparition de la lettre suivant la(es) lettre(s)", userInput);
    console.table(
        Object.entries(result)
            .sort((a, b) => b[1] - a[1])
            .map(([lettre, prob]) => ({
                LettreSuivante: lettre,
                Probabilité: prob
            }))
    );
});


