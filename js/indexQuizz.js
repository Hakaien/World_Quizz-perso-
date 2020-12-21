$(window).on("load", function () {

    var vignette = [
        { "id": 0, "name": "Applications Web", "image": "img/web.jpg", "fichier": "quizzweb" },
        { "id": 1, "name": "Animaux en Chiffres", "image": "img/animaux_en_chiffres.jpg", "fichier": "quizzanimauxenchiffres" },
        { "id": 2, "name": "Le 20e siècle", "image": "img/dates20.jpg", "fichier": "quizzdates20" },
        { "id": 3, "name": "Nintendo", "image": "img/nintendo.jpg", "fichier": "quizznintendo" },
        { "id": 4, "name": "Trouver le nombre", "image": "img/nombres.jpg", "fichier": "quizznombres" },
        { "id": 5, "name": "Microsoft", "image": "img/microsoft.jpg", "fichier": "quizzmicrosoft" },
        { "id": 6, "name": "Marques et Slogans", "image": "img/marquesslogans.jpg", "fichier": "quizzmarquesslogans" },
        { "id": 7, "name": "Méandres d'Internet", "image": "img/internet.jpg", "fichier": "quizzinternet" },
    ]

    //  Création des cartes 
    $(".card-title").text(vignette[0].name);
    $(".card-title").attr("id", vignette[0].fichier);
    $(".card-img-top").attr("src", vignette[0].image);

    //  Méthode clone avec appelle de l'objet pirate
    for (let i = 1; i < vignette.length; i++) {
        var copie = $("#vignette").clone();
        copie.find(".card-title").text(vignette[i].name);
        copie.find(".card-title").attr("id", vignette[i].fichier);
        copie.find(".card-img-top").attr("src", vignette[i].image);
        copie.find(".selecteur").attr("id", "selecteurVignette" + i);
        copie.find(".selecteurLabel").attr("for", "selecteurVignette" + i);
        copie.find("#btn0").attr("id", "btn" + i);
        copie.appendTo($("#vignetteCadre"));
    };

    // Cache du CorpusGResume qui contiendra le text pendant le quizz
    $("#corpusGResume").hide();

    //Cache du vignetteQuizz qui contiendra les questions du Quizz
    $("#vignetteQuizz").hide();

    // Une petite modif couleure pour les sélecteurs pour les identifier visuellement par l'utilisateur
    $(".selecteur").on("click", function () {
        $(".card").css({ background: "#611017" })
        $(".card-img-top").css("border-radius", "0px").css("box-shadow", "0px 0px 0px")
        $(this).parent().parent().parent().parent().css({ background: "#a3440c" });
        $(this).parent().parent().siblings(".card-img-top").css("border-radius", "10px").css("box-shadow", "8px 8px 15px white");
    });

    // Btn Lancer à gauche pour démarrer les Quizz
    $("#btn1").on("click", function () {
        // Mise en place règle pour lancer le quizz et demander le prénom :
        // Vérification des 2 conditions : 1 difficulté + 1 quizz sélectionnés

        // règle en cas de difficulté non sélectionné
        if (!$(".gridRad").is(":checked")) {
            alert("veuillez choisir une difficulté")
        }
        // règle en cas de quizz non sélectionné
        else if (!$(".selecteur").is(":checked")) {
            alert("Sélectionnez un quizz");
            // Validation des deux :
        } else {
            // On cache les vignettes du menu principal
            $(".card").hide();
            // Disable bouton "lancer" de gauche pour éviter récurrence
            $("#btn1").off("click");
            // Disable changement de difficulté en bloquant les boutons radios de gauche
            $(".gridRad").attr("disabled", "disabled");
            let askPrenom = "";
            askPrenom += "<div id='askPrenom'>"
            askPrenom += "<h2>Merci de nous donnez votre prénom</h2>"
            askPrenom += "<input type='text' id='inputPrenom' class='report'>"
            askPrenom += "<br>"
            askPrenom += "<input id='btnValid' for='inputPrenom' class='report boutonForm btn btn-danger' type='submit' value='Valider'>"
            askPrenom += "<p class='erreur'></p>"
            askPrenom += "</div>"
            $("#vignette").before(askPrenom);
            $("#askPrenom").css({ margin: "auto" }, { width: "90%" });

            $("#inputPrenom").keyup(function () {
                this.value = this.value.charAt(0).toUpperCase() + this.value.substr(1);
            });

            // CLICK BOUTON PRENOM !!!!!!!
            $("#btnValid").on("click", function () {

                // Validation du prénom et envoi des infos dans l'encart pour validation avant lancement du Quizz
                let regEx = /^[A-Za-zÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ]{4,}/;
                if ($("#inputPrenom").val().match(regEx)) {
                    $("#askPrenom").hide();

                    //    récupération du titre de la vignette
                    let titreQuizz = $(".selecteur:checked").parent().parent().siblings(".card-title").text();
                    //    récupération de l'image de la vignette
                    let imgQuizz = $(".selecteur:checked").parent().parent().siblings(".card-img-top").attr('src');
                    //    récupération du niveau de difficulté
                    let difficultQuizz = $(".gridRad:checked").val();
                    //    récupération du nom du fichier json
                    let fichierQuizz = $(".selecteur:checked").parent().parent().siblings(".card-title").attr("id");
                    //    récupération de l'input prénom entré par user
                    let prenomUser = $('#inputPrenom').val();

                    // Ajout du nouvel encart avec le résumé des informations pour validation avant le Quizz
                    let colonneResume = "";
                    colonneResume += "<div id='resume'>";
                    colonneResume += "<h2>" + titreQuizz + "</h2>";
                    colonneResume += "<img src='" + imgQuizz + "'>";
                    colonneResume += "<p>Niveau sélectionné : " + difficultQuizz + "</p><br>";
                    colonneResume += "<p>" + prenomUser + " vous allez</p>";
                    colonneResume += "<p>pouvoir démarrez le quizz !</p><br>";
                    colonneResume += "<input id='btnValid2' class='btnQuizz' for='inputPrenom' class='report boutonForm btn btn-danger' type='submit' value='Valider'>"
                    colonneResume += "</div>";
                    $("#askPrenom").after(colonneResume);

                    // CLICK BOUTON VALID RESUME !!!!!!!
                    $("#btnValid2").on("click", function () {
                        $("#resume").hide();
                        $("#corpusGHome").hide();
                        $("#corpusGResume").show();

                        let finalResume = "";
                        finalResume += "<h3>Joueur : " + prenomUser + " </h3>";
                        finalResume += "<hr>"
                        finalResume += "<img src='" + imgQuizz + "'>";
                        finalResume += "<h3> Quizz : </h3>";
                        finalResume += "<h2>" + titreQuizz + "</h2>";
                        finalResume += "<hr>"
                        finalResume += "<p>Vous jouez en : <br>" + difficultQuizz + "</p>";
                        finalResume += "<p>Bon courage !</p>";
                        finalResume += "<hr>";

                        $("#contenuResume").html(finalResume);

                        $.ajax({
                            url: "json/" + fichierQuizz + ".json",
                            type: "GET",
                            dataType: "json",

                            success: function (data) {
                                console.log(data);
                                console.log(data.quizz[difficultQuizz]);
                                $("#vignetteQuizz").show();
                                $("#vignetteCadre").html($("#vignetteQuizz"));

                                // Variable tampon pour la valeur de l'appel Ajax spécifique au Quizz sélectionné
                                var dataQuizz = data.quizz[difficultQuizz];

                                var i = 0;
                                // Implant data dans le html 
                                $(".quizzTitle").text("Questions n°(" + dataQuizz[i].id + ")");
                                $(".question").text(dataQuizz[i].question);
                                $(".anecdote").html(dataQuizz[i].anecdote);

                                var questionQuizz = dataQuizz[0].propositions;
                                for (let j = 0; j < questionQuizz.length; j++) {
                                    $("#prop" + j).text(questionQuizz[j]);
                                }

                                console.log(dataQuizz[i].réponse);
                                $(".propositions").draggable({
                                    scope: "goToRep",
                                    cursor: "move",
                                    snap: ".zoneReponse"
                                });
                                $(".propositions").selectable()
                                $(".zoneReponse").droppable({
                                    scope: "goToRep",
                                    activeClass: "active",
                                    hoverClass: "hover",
                                    drop: function (e, ui) {
                                        $(".propositions").draggable({ disabled: true });
                                        console.log(ui.draggable.text());
                                        $(this).html(ui.draggable.remove().html());
                                        $(this).droppable('destroy');
                                        $(this)
                                            .addClass("ui-state-highlight")
                                            .find("p")
                                            .html("i'm destroyed!");

                                        if (ui.draggable.text() == dataQuizz[i].réponse) {
                                            $(".zoneReponse").css({ border: "1px solid green", background: "green" });
                                            $(".anecdote").css({ visibility: "visible" });
                                            $(".btnAfter").css({ visibility: "visible" });
                                        } else {
                                            $(".zoneReponse").css({ border: "1px dashed red", background: "red" });
                                            $(".btnAfter").css({ visibility: "visible" });
                                        }
                                    }
                                });

                                for (let i = 1; i < data.length; i++) {
                                    $(".btnAfter").on("click", function () {
                                        
                                    })
                                }

                            },
                            error: function (resultat, status, erreur) {
                                console.log(resultat.statusText);
                            }

                        })
                    })
                }
                // erreur validation du prénom
                else {
                    $(".erreur").text("Veuillez entrer un prénom valide");
                }
            })
        }

    });
})
