document.addEventListener("DOMContentLoaded", function () {

    const languageSelect = document.getElementById('language-select');

    let lang = "en";
    if(localStorage.getItem("Language") != null){
        lang = localStorage.getItem("Language");
        languageSelect.value = lang;
    }
    langCheck();

    console.log(lang);
      languageSelect.addEventListener('change', function() {
        langCheck();
      });

    function langCheck(){
        const languageSelect = document.getElementById('language-select');
            if (languageSelect.value === 'fr') {
            //menu
                localStorage.setItem("Language", "fr");
                document.getElementById('Home').textContent = 'Accueil';
                document.getElementById('Experience').textContent = 'Experience de Travail';
                document.getElementById('Skills').textContent = 'Compétence';
                document.getElementById('Projects').textContent = 'Projets';
                document.getElementById('Education').textContent = 'Éducation';
               //page principal
               if(document.getElementById('intro') != null){
                document.getElementById('intro').textContent = 'Aléanne Camiré';
                document.getElementById('Introduction').textContent = "Bonjour, je suis une deuxième année qui étudie en informatique à l'Université de Montréal (UdeM). J'adore l'informatique, et j'ai commencé à apprendre il y a plus d'une décennie. Mes gros projets, par contre, ont commencé en 2022 quand j'ai créé un jeu vidéo, avec l'aide de mes amis. J'ai une longue histoire avec la programmation. Ma première langue a été Java, mais grâce à l'école, j'ai appris le c++, haskell, python et bien sûr, HTML. Je suis très motivé, et toujours prêt à apprendre. Je suis aussi extrêmement persévérante. J'espère que vous aimerez mes projets :).";
                }
            //Projects
                if(document.getElementById('docsOmega') != null){
                document.getElementById('docsOmega').textContent = 'Lien vers le documents de logique du jeu';
                document.getElementById('vidOmega').textContent = 'Lien vers le vidéo expliquant le jeu';
                }
                //Skills
                if(document.getElementById('skillintro') != null){
                document.getElementById('skillintro').textContent = 'Voici mes compétences';
                document.getElementById('ProgSkills').textContent = 'Languages de Programation';
                document.getElementById('Spoken').textContent = 'Languages Parler';
                document.getElementById('Spoen').textContent = 'Anglais';
                document.getElementById('Spofr').textContent = 'Français';
                }
                //Education

                if(document.getElementById('BacUdem') != null){
                document.getElementById('BacUdem').textContent = 'Baccalauréat en informatique';
                document.getElementById('DateUdem').textContent = 'Automne 2022 à Hiver 2025';
                document.getElementById('Certificate').textContent = 'Voici mon certificat';
                document.getElementById('DecSh').textContent = 'Dec en Sciences, Informatiques et Mathématiques';
                document.getElementById('DateCegep').textContent = 'Automne 2020 à Été 2022';
                }
                //Experience
                if(document.getElementById('BakeryIga') != null){
                document.getElementById('BakeryIga').textContent = 'Commis à la boulangerie, IGA';
                document.getElementById('Bakery1').textContent = 'Gèrer des stocks de boulangerie';
                document.getElementById('Bakery2').textContent = "Nettoyer et maintenir l'espace de travail de la boulangerie et l'équipement de congélation";
                document.getElementById('Bakery3').textContent = 'Fournir un excellent service client aux clients de la boulangerie';
                document.getElementById('Bakery4').textContent = 'Valider les poids et prix avec une imprimante de balance';
                document.getElementById('Bakery5').textContent = "Gérer les procédures de fermeture et d'ouverture de la boulangerie";
                document.getElementById('Bakery6').textContent = 'Mettre en place et effectuer le travail de préparation initial des produits alimentaires';
                document.getElementById('Bakery7').textContent = "Faire preuve d'une attitude positive et amicale envers les clients et les autres membres de l'équipe";
                document.getElementById('DishwasherMikes').textContent = 'Plongeur, Mikes';
                document.getElementById('dishwasher1').textContent = "Nettoyer, désinfecter et réapprovisionner la vaiselle, les casseroles et les ustensilles. aire fonctionner les machines conformément aux spécifications de l'entreprise et du fabricant, et utiliser des niveaux appropriés de détergent et de désinfectant.";
                document.getElementById('dishwasher2').textContent = "Nettoyer, désinfecter la machine à vaiselle a chaque quart de travail,inspectant les signes d'usure, consignant les résultats et soumettant les demandes de maintenance si nécessaire pour atténuer le risque de panne de l'équipement.";
                document.getElementById('dishwasher3').textContent = "Maintenir un environnement sûr et propre conformément aux directives d'assainissement en nettoyant et en organisant régulièrement l'entrepôt, les zones de stockage, le poste de travail et d'autres zones de cuisine selon les besoins.";
                document.getElementById('dishwasher4').textContent = "Effectuer des inspections visuelles et l'entretien de routine des lave-vaisselle, en signalant immédiatement tout problème fonctionnel ou mécanique à la direction pour réparation.";
                }

                //Projects
                if(document.getElementById('Omega1') != null){
                document.getElementById('Omega1').textContent = 'Jeux vidéo crée pour un appareil android sur android studio';
                document.getElementById('Omega2').textContent = "Conception et réalisation d'une interface pour jouer au jeu de cartes ainsi qu'aux cartes elles-mêmes.";
                document.getElementById('Omega3').textContent = "Travailler avec une équipe pour développer et maintenir les mécanismes de jeu et l'équilibre du jeu";
                document.getElementById('Omega4').textContent = 'Utiliser Java pour créer une IA pour jouer contre le joueur';
                document.getElementById('Omega5').textContent = 'Conceptualiser et créer les assets de jeu';
                document.getElementById('name1').textContent = 'Site Web de vente';
                document.getElementById('shop1').textContent = 'Créer avec Html, CSS, Javascript, Ajax et XML';
                document.getElementById('shop2').textContent = 'Conceptualiser un échantillon de site pour les achats en ligne';
                document.getElementById('shop3').textContent = 'Ajouter des characteristiques comme des filtres, des listes de produits dynamique et un panier';
                document.getElementById('name2').textContent = 'Système de gestion de robot';
                document.getElementById('Robo1').textContent = 'Créer avec Java et Swing';
                document.getElementById('Robo2').textContent = "Prototypage de l'application ainsi que la version final";
                document.getElementById('Robo3').textContent = "Robotix est une application de gesion de robot qui donnele control au clients sur leur robot, ainsi qu'un acces direct au fournisseur";
                document.getElementById('Task1').textContent = 'Créer avec HTML, CSS, Javascript, PHP et SQL';
                document.getElementById('Task2').textContent = "Créer un task manager qui utilise des databases pour sauvegarder l'informaion";
                document.getElementById('Task3').textContent = 'Créer un compte pour créer des taches et changer les catégorie associer au taches';
                document.getElementById('name3').textContent = 'Jeu Clicker';
                document.getElementById('click1').textContent = 'Créer avec Java';
                document.getElementById('click2').textContent = "Conception d'un jeu de clicker avec la possibilité de cliquer, de compter le temps, d'acheter des mises à niveau";
                document.getElementById('mine1').textContent = 'Créer avec C++';
                document.getElementById('mine2').textContent = 'Recréer minesweeper avec QT Creator';
                }

               // document.getElementById('').textContent = '';
               // document.getElementById('').textContent = '';
            } else if (languageSelect.value === 'en') {
                localStorage.setItem("Language", "en");
                //menu
                document.getElementById('Home').textContent = 'Home';
                document.getElementById('Experience').textContent = 'Work Experience';
                document.getElementById('Skills').textContent = 'Skills';
                document.getElementById('Projects').textContent = 'Projects';
                document.getElementById('Education').textContent = 'Education';
                //Projet Principal
                if(document.getElementById('intro') != null){
                document.getElementById('intro').textContent = 'Aleanne Camire';
                document.getElementById('Introduction').textContent = 'Hi, Im a second year university student currently studying at the University of Montreal (UdeM) in computer science. I love computer science and have been doing small projects for over a decade. But my big projects didnt start until 2022, where i would make an entire video game, with the help of somme friends. \n I have a long history of coding. My first language was Java, but given my experiences with school, i have had to work with c++, haskell, python and of course HTML. I am someone who is motivated, and always ready to learn. I am also very perseverent. I hope you like the projects that i have made over the years :)';
                }
                //Projet
                if(document.getElementById('docsOmega') != null){
                document.getElementById('docsOmega').textContent = 'Link towards the game logic document';
                document.getElementById('vidOmega').textContent = 'Link towards video explaining the project';
                }
                //skills
                if(document.getElementById('skillintro') != null){
                document.getElementById('skillintro').textContent = 'Here are my skills';
                document.getElementById('ProgSkills').textContent = 'Programming Language';
                document.getElementById('Spoken').textContent = 'Spoken Language';
                document.getElementById('Spoen').textContent = 'English';
                document.getElementById('Spofr').textContent = 'French';
                }
                //Education

                if(document.getElementById('BacUdem') != null){
                document.getElementById('BacUdem').textContent = 'Bachelor in Computer Science';
                document.getElementById('DateUdem').textContent = 'Fall 2022 to Winter 2025';
                document.getElementById('Certificate').textContent = 'Here is my certificate of training';
                document.getElementById('DecSh').textContent = 'DEC in Science, Mathematic and Computer Science';
                document.getElementById('DateCegep').textContent = 'Fall 2020 to Summer 2022';
                }
                //Experience
                if(document.getElementById('BakeryIga') != null){
                document.getElementById('BakeryIga').textContent = 'Bakery Clerk, IGA';
                document.getElementById('Bakery1').textContent = 'Managed bakery inventory';
                document.getElementById('Bakery2').textContent = "Cleaned and maintained bakery work spaces and freezer equipment";
                document.getElementById('Bakery3').textContent = 'Provided excellent customer service to bakery patrons';
                document.getElementById('Bakery4').textContent = 'Validated weights and pricing with a scale printer machine';
                document.getElementById('Bakery5').textContent = "Handled closing and opening procedures for the bakery";
                document.getElementById('Bakery6').textContent = 'Set up and performed initial prep work for food items';
                document.getElementById('Bakery7').textContent = "Displayed a positive and friendly attitude towards customers and fellow team members";
                document.getElementById('DishwasherMikes').textContent = 'Dishwasher, Mikes';
                document.getElementById('dishwasher1').textContent = "Cleaned, sanitized, and restocked dishes, glassware, utensils, and pots, operating machines to company and manufacturer specifications, and using proper levels of detergent and sanitizer.";
                document.getElementById('dishwasher2').textContent = "Broke down, cleaned, and sanitized dish machine at end of each shift, inspecting for signs of wear, logging findings, and submitting maintenance requests as needed to mitigate risk of equipment failure.";
                document.getElementById('dishwasher3').textContent = "Maintained safe, clean environment in alignment with sanitation guidelines by routinely cleaning and organizing stock room, storage areas, work station, and other kitchen areas as needed.";
                document.getElementById('dishwasher4').textContent = "Conduct visual inspections and routine maintenance of dish machines, immediately reporting any functional or mechanical problems to management for repair.";
                }

                if(document.getElementById('Omega_Power') != null){
                document.getElementById('Omega1').textContent = 'Video game made for android phones on android studio.';
                document.getElementById('Omega2').textContent = "Designed and made an interface to play the card game as well as the cards themselves.";
                document.getElementById('Omega3').textContent = "Worked with a team to develop and maintain game mechanics, and game balance.";
                document.getElementById('Omega4').textContent = 'Used Java to create an AI to play the games against the player';
                document.getElementById('Omega5').textContent = 'Create and design game assets';
                document.getElementById('name1').textContent = 'Shopping Website ';
                document.getElementById('shop1').textContent = 'Created using HTML, CSS, Javascript, Ajax and XML';
                document.getElementById('shop2').textContent = 'Designed a sample shopping website for online shopping';
                document.getElementById('shop3').textContent = 'Added featurers like filters, dynamic product lists and a shopping bag';
                document.getElementById('name2').textContent = 'Robot Management System';
                document.getElementById('Robo1').textContent = 'Created using Java and Swing';
                document.getElementById('Robo2').textContent = "Prototyping and final version of a robot management application";
                document.getElementById('Robo3').textContent = "Robotix is a robot management application which gives control to clients of their robots, as well as having direct acces to suppliers";
                document.getElementById('Task1').textContent = 'Created using HTML, CSS, Javascript, PHP and SQL';
                document.getElementById('Task2').textContent = "Create a task manager that uses databases to save the information.";
                document.getElementById('Task3').textContent = 'Create a account to create task, and alter what category they are in';
                document.getElementById('name3').textContent = 'Clicker Game';
                document.getElementById('click1').textContent = 'Created using Java';
                document.getElementById('click2').textContent = "Designed a clicker game with the ability to click, count time, buy upgrades";
                document.getElementById('mine1').textContent = 'Created in C++';
                document.getElementById('mine2').textContent = 'Recreated Minesweeper in QT Creator';
                }

            }

    }
    function toggleNav() {
      const nav = document.querySelector('nav');
      nav.classList.toggle('active');
    }

});
