'use strict';

document.addEventListener('DOMContentLoaded', () => {

    const movieDB = {
        movies: [
            "ЛОГАН",
            "АЛИГА СПРАВЕДЛИВОСТИ",
            "ЛА-ЛА ЛЭНД",
            "ОДЕРЖИМОСТЬ",
            "СКОТТ ПИЛИГРИМ ПРОТИВ...",
            "007: СПЕКТР"
        ]

    };

    const adv = document.querySelectorAll('.promo__adv img'),
        poster = document.querySelector('.promo__bg'),
        genre = poster.querySelector('.promo__genre'),
        movieList = document.querySelector('.promo__interactive-list'),
        addForm = document.querySelector('form.add'),
        addInput = addForm.querySelector('.adding__input'),
        checkbox = addForm.querySelector('[type="checkbox"]'),
        promo = document.querySelectorAll('.promo__menu-item');

    addForm.addEventListener('submit', (event) => {
        event.preventDefault();

        let newFilm = addInput.value;
        const favorite = checkbox.checked;

        if (newFilm) {

            if(newFilm.length > 19){
                newFilm = `${newFilm.substring(0,20)}...`;
            }

            if(favorite) {
                newFilm += ' (Любимый)';
            }

            movieDB.movies.push(newFilm);
            sortArr(movieDB.movies);

            createMovieList(movieDB.movies, movieList);
        }



        event.target.reset();

    });

    const deleteAdv = (arr) => {
        arr.forEach(item => {
            item.remove();
        });
    };

    const makeChanges = () => {
        genre.textContent = 'DRAMA';

        poster.style.backgroundImage = 'url("img/bg.jpg")';

    };

    const sortArr = (arr) => {
        arr.sort();
    };

    function createMovieList(films, parent) {
        parent.innerHTML = '';
        sortArr(films);

        films.forEach((film, i) => {
            parent.innerHTML += `
                <li class="promo__interactive-item">${i + 1} ${film}
                    <div class="delete"></div>
                </li>
            `;
        });

         document.querySelectorAll('.delete').forEach((btn, i) => {
             btn.addEventListener('click', () => {
                btn.parentElement.remove();
                movieDB.movies.splice(i, 1);

                createMovieList(films, parent);
             });
         });

        ////Menu

        function remove(){
            promo.forEach(item => {
                item.classList.remove('promo__menu-item_active');
            });
        }

        promo.forEach(item => {
            item.addEventListener('click', () => {
                event.preventDefault();
                remove();
                item.classList.add('promo__menu-item_active');
            });
        });

    }

    ////deleteAdv(adv);
    makeChanges();
    createMovieList(movieDB.movies, movieList);
});