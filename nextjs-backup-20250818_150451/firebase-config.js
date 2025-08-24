// Firebase configuration - Clean foundation
(function() {
    'use strict';
    
    // Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyAYH8nF9_W9X8pY5cU9L-8s4Q3v2M1P7bE",
        authDomain: "flyingnimbustest.firebaseapp.com",
        projectId: "flyingnimbustest",
        storageBucket: "flyingnimbustest.appspot.com",
        messagingSenderId: "123456789012",
        appId: "1:123456789012:web:abcdef123456789",
        measurementId: "G-ABCDEF1234"
    };
    
    // Initialize Firebase only if it's available
    if (typeof firebase !== 'undefined') {
        try {
            firebase.initializeApp(firebaseConfig);
            
            // Initialize Analytics if available
            if (firebase.analytics) {
                firebase.analytics();
            }
            
            // Initialize Firestore if available
            if (firebase.firestore) {
                const db = firebase.firestore();
                
                // Simple content manager for future use
                window.contentManager = {
                    async fetchArticles() {
                        try {
                            const snapshot = await db.collection('articles').orderBy('date', 'desc').get();
                            return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                        } catch (error) {
                            console.log('Articles fetch error:', error);
                            return [];
                        }
                    },
                    
                    async fetchProducts() {
                        try {
                            const snapshot = await db.collection('products').orderBy('date', 'desc').get();
                            return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                        } catch (error) {
                            console.log('Products fetch error:', error);
                            return [];
                        }
                    }
                };
            }
            
        } catch (error) {
            console.log('Firebase initialization error:', error);
        }
    } else {
        console.log('Firebase not loaded, using local data only');
    }
})();