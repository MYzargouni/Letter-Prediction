# Letter Prediction

Bonjour,

Ce projet réalisé par Natalène Harounyan et Mohamed Yacine Zargouni a pour but de prédire la lettre suivant une ou deux lettres en utilisant le principe des chaines de Markov.

## Préparation
Pour réaliser notre prédiction, nous avons utilisé des corpus de texte français disponibles en ligne : 
 - "Le petit prince", Antoine de Saint-Exupéry
 - "Rapport minoritaire", Philip K. Dick
 - Les contes de Grimm
Les textes ont été choisis arbitrairement et permettront de définir un base d'analyse pour les futures prédictions.

Dans un premier temps dans le fichier cleanText.js nous traitons les fichiers textes sélectionnés. Nous enlevons tous ce qui n'est pas une lettre et nous remplaçons les apostrophes, tirets et autres par des espaces. Puis nous fusionnons le tout dans un unique fichier.

```javascript
const cleanPP = preprocess(texteSepparePP);
const cleanRM = preprocess(contentRMinint);
const cleanCG = preprocess(contentCGinint);
fs.writeFileSync('text_source/corpus_fusionne.txt', texteFusionne, 'utf8');
```

## Prédiction
Le reste du travail est dans le fichier index.js. Voici un descriptif des méthodes créées.

letters() crée un objet avec tous les caractères séparés à la manière d'un array.

groupement() groupe chaque lettre (ou deux) à la suivante.

buildCounts() compte le nombre d'apparition de chaque lettre en fonction de ce qui précède.

proba() transforme ce nombre en une probabilité entre 0 et 1.

Ensuite nous créons deux objets pour conserver les données de probabilités pour une lettre et deux lettres, et une dernière méthode pour extraire une lettre (ou deux) précise(s).
```javascript
const ProbaTotalO1 = proba(buildCounts(1,letters(texteFusionne)));
const ProbaTotalO2 = proba(buildCounts(2,letters(texteFusionne)));
const Chosirlettre = (lettre, ProbaTotal) => R.prop(lettre)(ProbaTotal);
```
## Affichage

Pour l'affichage nous vérifions juste que l'input utilisateur est bien une lettre, puis nous choisissons quelles objets utiliser en fonction de la taille de l'input. voici un exemple avec 'le' :


![image alt](https://github.com/MYzargouni/Letter-Prediction/blob/main/exemple%20avec%20'le'.png?raw=true)
## License

Faites absolument ce que vous voulez avec ce projet ! <3
