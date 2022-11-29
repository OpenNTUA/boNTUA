const map = new Map();

map.set('1', {
	questionId: 1,
	question: 'Σε ένα ισοζυγισμένο δυαδικό δέντρο αναζήτησης με **n** στοιχεία, η αναζήτηση ενός στοιχείου:',
	answers: ['απαιτεί χρόνο **O(1)** στη χειρότερη περίπτωση.',
		'απαιτεί χρόνο **Ω(n)** στη χειρότερη περίπτωση.',
		'απαιτεί χρόνο **Ο(1)** στην καλύτερη περίπτωση.',
		'απαιτεί χρόνο **Ω(n logn)** στη χειρότερη περίπτωση.'],
	correctAnswerIndex: 2,
	code: undefined,
	// This has to be array with codes included that go alongside the question
	year: '2018',
	imageURL: undefined,
});
map.set('2', {
	questionId: 2,
	question: 'Έστω ότι έχετε τρεις διαφορετικούς αλγορίθμους Α, Β και Γ, που επιλύουν το ίδιο πρόβλημα. Η πολυπλοκότητα του Α είναι Ο(n^3), του Β είναι Ο(n^2 log^5(n)), και του Γ είναι Ο(n!). Ποιον από τους τρεις θα προτιμούσατε; (Θεωρήστε ότι μας ενδιαφέρουν μεγάλες τιμές του n.)',
	answers: ['τον Α',
		'τον Β',
		'τον Γ',
		'οποιονδήποτε από τους Α ή Β, δεν έχουν διαφορά'],
	correctAnswerIndex: 1,
	code: undefined,
	year: '2018',
	imageURL: undefined,
});
map.set('3', {
	questionId: 3,
	question: 'Ποια είναι η τιμή της μεταβλητής **t** στο τέλος της εκτέλεσης του ακόλουθου τμήματος προγράμματος;',
	answers: ['1023',
		'1024',
		'2047',
		'κανένα από τα προηγούμενα'],
	correctAnswerIndex: 0,
	code: ['```cpp\nint n = 1024, t = 0;\nfor (int i = 1; i <= n; i *= 2) {\n\t for (int j = 1; j <= i; j++) t++;\nn--;\n}\n```'],
	year: '2018',
	imageURL: undefined,
});
map.set('4', {
	questionId: 4,
	question: 'Ποια από τα παρακάτω προγράμματα τυπώνει **42**;',
	answers: ['το πρώτο',
		'το δεύτερο',
		'και τα δύο',
		'κανένα από τα δύο'],
	correctAnswerIndex: 0,
	code: ['```cpp\nint k=3;\n PROC proc1(int &n) {\n\tk *= n-1; WRITELN((n+1)*k);\n}\nPROGRAM { proc2(k); }\n```', '```cpp\nint k=3;\n PROC proc2(int n) {\n\tk *= n-1; WRITELN((n+1)*k);\n}\nPROGRAM { proc1(k); }\n```'],
	year: '2018',
	imageURL: undefined,
});
map.set('5', {
	questionId: 5,
	question: 'Τι τυπώνει το παρακάτω πρόγραμμα;',
	answers: ['6',
		'8',
		'42',
		'κανένα από τα προηγούμενα'],
	correctAnswerIndex: 3,
	code: ['```cpp\nPROGRAM {\n\tint *p = new int; *q = new int; *t = new int;\n\t*p=3; *q=5; *t=7;\n\tp=q; q=t;\n\t*t=*p * *q; *q *= *p;\n\tWRITELN(*t);\n}\n```'],
	year: '2018',
	imageURL: undefined,
});
map.set('6', {
	questionId: 6,
	question: 'Ποια είναι η τιμή της μεταβλητής **n** στο τέλος της εκτέλεσης του ακόλουθου τμήματος προγράμματος;',
	answers: ['131',
		'259',
		'1024',
		'κανένα από τα προηγούμενα'],
	correctAnswerIndex: 1,
	code: ['```cpp\nint n = 999, p = 1;\ndo { n /= 2; p *= 2; } while (n > 4);\nn += p;\n```'],
	year: '2018',
	imageURL: undefined,
});
map.set('7', {
	questionId: 7,
	question: 'Έστω ότι έχετε τρεις διαφορετικούς αλγορίθμους Α, Β και Γ, που επιλύουν το ίδιο πρόβλημα. Η πολυπλοκότητα του Α είναι Ο(n^(4/3)), του Β είναι Ο(n log^2(n)), και του Γ είναι Ο((4/3)^n). Ποιον από τους τρεις θα προτιμούσατε; (Θεωρήστε ότι μας ενδιαφέρουν μεγάλες τιμές του n.)',
	answers: ['τον Α',
		'τον Β',
		'τον Γ',
		'οποιονδήποτε από τους Α, Β και Γ, δεν έχουν διαφορά'],
	correctAnswerIndex: 1,
	code: undefined,
	year: '2019',
	imageURL: undefined,
});
map.set('8', {
	questionId: 8,
	question: 'Τοποθετήστε τους παρακάτω αλγορίθμους σε αύξουσα σειρά (πρώτος αυτός με τη μικρότερη πολυπλοκότητα), ως προς την χρονική τους πολυπλοκότητα στη χειρότερη περίπτωση.\n> A. ταξινόμηση με διαμέριση (quicksort) σε πίνακα n στοιχείων\n> B. δυαδική αναζήτηση σε ταξινομημένο πίνακα n στοιχείων\n> B. εύρεση του 30ου μικρότερου στοιχείου σε μη ταξινομημένο πίνακα n στοιχείων.',
	answers: ['Γ, Α, Β',
		'Β, Γ, Α',
		'Β, Α, Γ',
		'Γ, Β, Α'],
	correctAnswerIndex: 1,
	code: undefined,
	year: '2019',
	imageURL: undefined,
});
map.set('9', {
	questionId: 9,
	question: 'Ποια είναι η τιμή της μεταβλητής **n** στο τέλος της εκτέλεσης του ακόλουθου τμήματος προγράμματος;',
	answers: ['1024',
		'1030',
		'4096',
		'4103'],
	correctAnswerIndex: 3,
	code: ['```cpp\nn=1; p=1;\ndo { n *= 4; p++; } while (n <= 1024);\nn += p;\n```'],
	year: '2019',
	imageURL: undefined,
});
map.set('10', {
	questionId: 10,
	question: 'Ο καλύτερος αλγόριθμος αναζήτησης στοιχείου σε διπλά συνδεδεμένη λίστα με n στοιχεία ταξινομημένα σε αύξουσα σειρα:',
	answers: ['απαιτεί χρόνο Ο(1) στη χειρότερη περίπτωση.',
		'απαιτεί χρόνο Ο(logn) στη χειρότερη περίπτωση.',
		'απαιτεί χρόνο Ο(n) στη χειρότερη περίπτωση.',
		'απαιτεί χρόνο Ο(n logn) στη χειρότερη περίπτωση.'],
	correctAnswerIndex: 2,
	code: undefined,
	year: '2019',
	imageURL: undefined,
});
map.set('11', {
	questionId: 11,
	question: 'Ποιο από τα παρακάτω προγράμματα τυπώνει **144**;',
	answers: ['test1',
		'test2',
		'και τα δύο',
		'κανένα από τα δύο'],
	correctAnswerIndex: 0,
	code: ['```cpp\nint k=3;\nPROC proc1 (int &n) {\n\tn=k*(k+1); WRITELN(n*k);\n}\nPROGRAM test1() { proc1(k); }\n```',
		'```cpp\nint k=3;\nPROC proc2 (int n) {\n\tn=k*(k+1); WRITELN(n*k);\n}\nPROGRAM test2() { proc2(k); }\n```'],
	year: '2019',
	imageURL: undefined,
});
map.set('12', {
	questionId: 12,
	question: 'Τι επιστρέφει η παρακάτω συνάρτηση αν κληθεί με x = 800 και n = 100;',
	answers: ['1597',
		'1600',
		'80000',
		'κανένα από τα προηγούμενα'],
	correctAnswerIndex: 0,
	code: ['```cpp\nFUNC int fun(int x, int n) {\n\tif (n == 0) return x;\n\telse return x + fun(x/2, n-1);\n}\n```'],
	year: '2019',
	imageURL: undefined,
});
map.set('13', {
	questionId: 13,
	question: 'Τι τυπώνει το παρακάτω πρόγραμμα;',
	answers: ['40',
		'42',
		'52',
		'κανένα από τα προηγούμενα'],
	correctAnswerIndex: 2,
	code: ['```cpp\nPROGRAM {\n\tint *p = new int, *q = new int, *t = new int;\n\t*p=5; *q=15; t=p;\n\t*t*=*p; *q+=*t+*p/2;\n\tWRITELN(*q);\n}\n```'],
	year: '2019',
	imageURL: undefined,
});
// map.set('14', {
// 	questionId: 14,
// });
// map.set('15', {

// });
// map.set('16', {

// });
// map.set('17', {

// });
// map.set('18', {

// });
// map.set('19', {

// });

module.exports = map;