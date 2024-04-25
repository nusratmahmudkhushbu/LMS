import { useEffect } from "react";
import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import { addBookAPi, updateBookApi } from "../api/endPointsApi";
import { useAuth } from "../security/authContext";

export default function BookForm() {
    const [title, setTitle] = useState('');
    const [isbn, setIsbn] = useState('');
    const [author, setAuthor] = useState('');
    const [publisher, setPublisher] = useState('');
    const [description, setDescription] = useState('');
    const [year, setYear] = useState('');
    const [pdf, setPdf] = useState('');
    const [image, setImage] = useState('');
    const [genre, setGenre] = useState('');
    const [bookId, setBookId] = useState(0);

    const location = useLocation();
    const authContext = useAuth();
    const user_id = authContext.getId();
    const navigate = useNavigate();

    useEffect(()=>{
        authContext.refresh();
        if (location.state.flag) {
            setTitle(location.state.book.title)
            setIsbn(location.state.book.isbn)
            setAuthor(location.state.book.author)
            setPublisher(location.state.book.publisher)
            setDescription(location.state.book.description)
            setYear(location.state.book.year)
            setPdf(location.state.book.pdf_link)
            setImage(location.state.book.image_link)
            setGenre(location.state.book.genre)
            setBookId(location.state.book.book_id)
        }
    },[authContext, location])

    function handleTitleChange(event) {
        setTitle(event.target.value)
    }

    function handleIsbnChange(event) {
        setIsbn(event.target.value)
    }

    function handleAuthorChange(event) {
        setAuthor(event.target.value)
    }

    function handlePublisherChange(event) {
        setPublisher(event.target.value)
    }

    function handleDescriptionChange(event) {
        setDescription(event.target.value)
    }

    function handleYearChange(event) {
        setYear(event.target.value)
    }

    function handlePdfChange(event) {
        setPdf(event.target.value)
    }

    function handleImageChange(event) {
        setImage(event.target.value)
    }

    function handleGenreChange(event) {
        setGenre(event.target.value)
    }

    function submitAdd() {
        const book = {
            user_id: user_id,
            title: title,
            isbn: isbn,
            author: author,
            publisher: publisher,
            description: description,
            year: year,
            pdf: pdf,
            image: image,
            genre: genre
        }
        addBookAPi(book)
            .then((response) => window.location.href = '/all-book')
            .catch((error) => navigate('/error'))
    }

    function submitEdit() {
        const book = {
            user_id: user_id,
            id: bookId,
            title: title,
            isbn: isbn,
            author: author,
            publisher: publisher,
            description: description,
            year: year,
            pdf: pdf,
            image: image,
            genre: genre
        }
        updateBookApi(book)
            .then((response) => window.location.href = '/all-book')
            .catch((error) => {
                console.log(error)
                navigate('/error')
            })
    }

    return (
    <div className="d-flex align-items-center justify-content-center mt-4" style={{ height: "100vh" }}>
        <div className="w-50 text-start">
            {!location.state.flag && <h2 className="text-center">Add Book</h2>}
            {location.state.flag && <h2 className="text-center">Edit Book</h2>}
            <label>Book Tite</label>
            <input type='text' className="form-control" value={title} onChange={handleTitleChange} />
            <label>ISBN</label>
            <input type='text' className="form-control" value={isbn} onChange={handleIsbnChange} />
            <label>Author</label>
            <input type='text' className="form-control" value={author} onChange={handleAuthorChange} />
            <label>Publisher</label>
            <input type='text' className="form-control" value={publisher} onChange={handlePublisherChange} />
            <label>Description</label>
            <textarea type='text' className="form-control" value={description} onChange={handleDescriptionChange} />
            <label>Year</label>
            <input type='text' className="form-control" value={year} onChange={handleYearChange} />
            <label>PDF Link</label>
            <input type='text' className="form-control" value={pdf} onChange={handlePdfChange} />
            <label>Image Link</label>
            <input type='text' className="form-control" value={image} onChange={handleImageChange} />
            <label>Genre</label>
            <input type='text' className="form-control" value={genre} onChange={handleGenreChange} />
            {!location.state.flag && <td className="btn btn-primary form-control mt-4" onClick={submitAdd}>Add</td>}
            {location.state.flag && <td className="btn btn-success form-control mt-4" onClick={submitEdit}>Change</td>}
        </div>
    </div>
    )
}