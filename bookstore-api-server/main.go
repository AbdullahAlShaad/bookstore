package main

import (
	"github.com/Shaad7/bookstore-api-server/handler"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/jwtauth/v5"

	"log"
	"net/http"
)


func main() {

	r := chi.NewRouter()

	r.Use(middleware.RequestID)
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(middleware.URLFormat)

	r.Get("/",func(w http.ResponseWriter , r *http.Request) {
		w.Write([]byte("root."))
	})

	r.Post("/login", handler.Login)
	r.Post("/logout", handler.Logout)
	r.Post("/register", handler.Register)

	r.Group(func(r chi.Router) {

		r.Route("/books",func(r chi.Router) {

				r.Get("/", handler.GetAllBooks)
				r.Get("/name/{bookName}", handler.GetBookByName)
				r.Get("/simple", handler.GetBooksNameSimplified)
				r.Get("/isbn/{ISBN}", handler.GetBookByISBN)

				r.Group(func(r chi.Router) {

					r.Use(jwtauth.Verifier(handler.TokenAuth))
					r.Use(jwtauth.Authenticator)

					r.Post("/", handler.AddBook)
					r.Put("/{ISBN}", handler.UpdateBook)
					r.Delete("/{ISBN}", handler.DeleteBook)
				})

		})

		r.Route("/authors",func(r chi.Router) {
			r.Get("/", handler.GetAllAuthors)
			r.Get("/{AuthorName}", handler.GetAuthorInfo)
		})
	})


	if err := http.ListenAndServe(":8081",r); err != nil {
		log.Fatalln(err)
	}
}

/*
{
    "book_name" : "Harry Potter",
    "author_info" : {
        "name" : "JK Rowling",
        "date_of_birth" : "31 July 1965",
        "birth_place" : "England"
    },
    "ISBN" : "0-7475-3269-9",
    "Genre" : "Fantasy",
    "Publisher" : "Bloomsbury"
}

{
    "book_name" : "The Sicilian",
    "author_info" : {
        "name" : "Mario Puzo",
        "date_of_birth" : "October 15, 1920",
        "birth_place" : "United States"
    },
    "ISBN" : "0-671-43564-7",
    "Genre" : "Thriller",
    "Publisher" : "Random House"
}

*/