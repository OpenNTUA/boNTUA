# boNTUA - Με ❤️ για το ΕΜΠ

## Πως δουλεύει το μποτάκι
### `/quiz subject:[progintro | progtech] id:[id]`
Δημιουργεί ένα interactive τεστ/κουίζ διαρκείας 20 λεπτών από τα παλεότερα θέματα πολλαπλής επιλογής εξετάσεων, μην διαλέξετε το id άμα θέλετε το interactive quiz, αφήστε κενό, αλλιώς διαλέξτε το id άμα σας ενδιαφέρει να δείξετε κάποια πολλαπλής για σχόλιο.
- Παράδειγμα χωρίς id `/quiz subject:progintro`:

![gif demonstrating quiz command use](https://media.giphy.com/media/3Q42JQYjiUw7aYTU8I/giphy.gif) ![gif demonstrating quiz command results menu](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmU4OTdlOWM3YWY0NWQyOTQ0YTYxZTg5ZWI1OGZjZDAyNzE2ZmQyOSZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/URXEoNVcBKJSpgyD1e/giphy.gif)
- Παράδειγμα με id `/quiz subject:progintro id:2`:

![gif demonstrating quiz command with id](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNTVkMTkwODFiZjEzM2U3NmJlMjYzZGJiYmU4YTczOThiMDMzMTBlYSZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/z1liIzSqFGGW6fOmxj/giphy.gif)

### `/exercise subject:[progintro | progtech] problem?:[problemId]`
Δίνει εκφωνήσεις των ασκήσεων του [Grader](http://grader.softlab.ntua.gr/), το `problem` έχει autocomplete και παίρνει συγκεκριμένες τιμές, άμα θέλετε να δείτε την λίστα όλων των ασκήσεων, μην επιλέξετε το `problem`. Το `progtech` επιλογή δίνει error γιατί δεν υπάρχουν ασκήσεις για αυτές ακόμα.
- Παράδειγμα χωρίς problem `/exercise subject:progintro`:

![exercise command demonstration without problem](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMTNjMjhhYjFiNTIyOTA1Y2ZkN2JjMjU1MGNiNGIyNzVjNmRjYzc2NSZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/XTwa9mz1WPTUdeHM1l/giphy.gif)
- Παράδειγμα με χρήση problem `/exercise subject:progintro problem:sndlast`:

![exercise command demonstration with problem](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMWQ0NTVkZTNhOGVlZmUyYzkyMjNiOTQzYWY0MzM3MDgzN2VmOGJmNSZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/UHMg3QkcZPwyOS02to/giphy.gif)

### `/themata subject?:[subject]`
Όλα τα παλιά θέματα εξετάσεων που υπάρχουν στο [forum](https://shmmy.ntua.gr/forum/). Για να προσθέσετε περισσότερα θέματα, δείτε [εδώ](https://github.com/OpenNTUA/themata).

![themata command demonstration](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZWFkYjAyMDkyOWYwM2ZjNTcwYWE4MWUzYzcyZmEwZmMwN2Q3MjFlNyZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/xNKbhqiBD0aYhLkiuB/giphy.gif)

### `/info`
Γενικές πληροφορίες για την σχολή που είναι καλό όλοι οι φοιτητές να ξέρουν.

## Πως να τρέξετε το μποτάκι
Κλονήστε το repository
```sh
git clone https://github.com/OpenNTUA/boNTUA.git
```
Αλλάξτε το directory με `cd boNTUA` και μετά τρέξτε
```sh
npm install
```
Δημιουργήστε το αρχείο `.env` στο root folder η οποία είναι `boNTUA` και γράψτε
```sh
TOKEN=YOUR_TOKEN
CLIENT_ID=YOUR_CLIENT_ID
```
Για να αρχίσει το μποτάκι τρέξτε
```sh
npm start
```

## Πως να προσθέσετε ερωτήματα πολλαπλής επιλογής
Μπείτε στο φάκελο `./boNTUA/src/data`, εκεί θα δείτε δύο φακέλους `progintro` και `progtech`, και οι δύο μέσα περιέχουν αρχεία 'quizes.js' και `exercises.js`. Και τα δύο παίρνουν περιεχόμενα ίδιας φόρμας. Ανάλογα με το μάθημα διαλέξτε το αρχείο, είναι ένα `Map` object και κάθε φορά που θέλετε να προσθέσετε κάτι, κατεβείτε στο τέλος και κάντε `Map.set(key, {...})`. Όμως όταν γράφεται πρέπει να είναι όμορφα γραμμένα, θα χρειαστεί να χρησιμοποιήσετε [Markdown](https://gist.github.com/matthewzring/9f7bbfd102003963f9be7dbcf7d40e51).
### Για το `quizes.js` η μορφή είναι:
```js
map.set('', {
    questionId: number,
    question: string,
    answers: Array<string>,
    correctAnswerIndex: number,
    code: Array<string> | undefined,
    year: string, // '' κενό string άμα δεν έχει έτος
    imageURL: string | undefined,
});
```
Και πρέπει `answers.length <= 5`. Για παράδειγμα
```js
map.set('9', {
	questionId: 9,
	question: 'Ποια είναι η έξοδος από την εκτέλεση του παρακάτω κώδικα C++;',
	answers: ['10',
		'11',
		'20',
		'21'],
	correctAnswerIndex: 2,
	code: ['```cpp\n#include <iostream>\nusing namespace std;\n\nint main() {\n\tint arr[] = {10, 11, 12, 13};\n\tint *p = (arr + 1);\n\tcout << *arr + 10;\n}\n```'],
	year: '2017',
	imageURL: undefined,
});
```
### Για το `exercises.js` η μορφή είναι:
```js
map.set('Key', {
	title: string,
	description: string,
	inputDescription: string | undefined,
	outputDescription: string | undefined,
	input: Array<string>| string | undefined,
	// This follows input, if there is input, there must be an output, if there is no input, there must be no output.
	output: Array<string>| string | undefined,
	url: string | undefined,
	constraints: string | undefined,
	difficulty: string | undefined,
	difficultyGrade: string | undefined,
});
```
Για παράδειγμα
```js
map.set('count7', {
	title: 'count7',
	description: 'Να γράψετε ένα πρόγραμμα που να δέχεται ένα διψήφιο φυσικό αριθμό και να βρίσκει πόσα από τα ψηφία του είναι ίσα με 7.',
	inputDescription: 'Μόνο μία γραμμή που θα περιέχει το διψήφιο φυσικό αριθμό.',
	outputDescription: 'Μόνο μία γραμμή που θα περιέχει ακριβώς ένα φυσικό αριθμό μεταξύ 0 και 2 (συμπεριλαμβανομένων).',
	input: ['17', '42', '77'],
	output: ['1', '0', '2'],
	url: 'http://grader.softlab.ntua.gr/?page=problem&id=72',
	constraints: '⏱️: 1s 💻: 16MB',
	difficulty: 'Εύκολο',
	difficultyGrade: '1',
});
```


