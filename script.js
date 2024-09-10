// Initialize Firebase
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBaHzV5RspjPdxtvhazQQvi6W2-C-vazYQ",
    authDomain: "hotels-165ae.firebaseapp.com",
    projectId: "hotels-165ae",
    storageBucket: "hotels-165ae.appspot.com",
    messagingSenderId: "321041102493",
    appId: "1:321041102493:web:08a5469bf93327208a4674",
    measurementId: "G-09Z19WK3D9"
  };

// Get Firebase services
const auth = firebase.auth();
const db = firebase.firestore();

// Handle logout
const logoutButton = document.getElementById('logoutButton');
if (logoutButton) {
    logoutButton.addEventListener('click', function (e) {
        e.preventDefault();
        auth.signOut().then(() => {
            window.location.href = 'index.html';
        }).catch(error => {
            console.error('Error logging out:', error);
        });
    });
}

// Handle login
const loginForm = document.getElementById('loginForm');
const loginMessage = document.getElementById('loginMessage');
if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        auth.signInWithEmailAndPassword(email, password)
            .then(userCredential => {
                window.location.href = 'index.html';
            })
            .catch(error => {
                loginMessage.textContent = error.message;
            });
    });
}

// Handle hotel comparison
const compareForm = document.getElementById('compareForm');
const comparisonResults = document.getElementById('comparisonResults');
if (compareForm) {
    compareForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const hotel1 = document.getElementById('hotel1').value;
        const hotel2 = document.getElementById('hotel2').value;

        Promise.all([
            db.collection('hotels').doc(hotel1).get(),
            db.collection('hotels').doc(hotel2).get()
        ]).then(results => {
            const [hotel1Data, hotel2Data] = results;
            comparisonResults.innerHTML = `
                <h3>${hotel1}</h3>
                <p>Amenities: ${hotel1Data.data().amenities.join(', ')}</p>
                <h3>${hotel2}</h3>
                <p>Amenities: ${hotel2Data.data().amenities.join(', ')}</p>
            `;
        }).catch(error => {
            console.error('Error fetching hotel data:', error);
        });
    });
}
