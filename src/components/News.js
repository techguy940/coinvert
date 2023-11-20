import Navbar from './Navbar.js';
import '../styles/news.css';
import '../styles/pagination.css';
import ScaleLoader from "react-spinners/ScaleLoader";
import { useState, useEffect } from "react";
import axios from "axios";
import NewsSec from './NewsSec.js';
import ReactPaginate from 'react-paginate';

// Collection of <NewsSec /> components creating a page of recent news related to currency market
function News(){
    // gets width and height of the user's screen to let paginate resize accordingly
    const getWindowSize = () => {
        const {innerWidth, innerHeight} = window;
        return {innerWidth, innerHeight};
    }

    // BASE api url for news along with its API KEY
    const BASE = "https://newsapi.org/v2/everything";
    const API_KEY = "";

    // news array to store fetched news
    const [news, setNews] = useState([]);

    // currentPage keeps track of the page the user is currently at
    const [currentPage, setCurrentPage] = useState(0);

    // PER_PAGE is the number of news article per page
    const PER_PAGE = 12;

    // offset is the number to be added to currentPage to get to the next page news
    const [offset, setOffset] = useState(0);

    // currentPageData has the subarray of news from `news` according to currentPage
    const [currentPageData, setCurrentPageData] = useState([])

    // pageCount is the total number of pages used for pagination, calculated later
    const [pageCount, setPageCount] = useState(0)

    // windowSize keeps track of width and height of user's screen for responsiveness
    const [windowSize, setWindowSize] = useState(getWindowSize());

    // whenever the components load, add event listener when window resizes to update windowSize
    useEffect(() => {

        function handleWindowResize() {
            setWindowSize(getWindowSize());
        }

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);


    // whenever the components load, fetch the latest news from API
    useEffect(() => {
        axios.get(BASE, {
            params: {
                language: "en",
                apiKey: API_KEY,
                q: "forex"
            }
        }).then(res => {
            // set the pageCount variable
            setPageCount(Math.ceil(res.data['articles'].length / PER_PAGE))
            const _news = Array.from(res.data['articles'].map(article => {
                return {"published": article['publishedAt'], "url": article["url"], "imgUrl": article["urlToImage"], "title": article["title"]}
            }));
            // sort the news by publishing date, newest first
            _news.sort(function (a, b){
                return Date.parse(b.published) - Date.parse(a.published)
            })
            // set currentPageData as per currentPage
            setCurrentPageData(_news.slice(offset, offset + PER_PAGE))
            // set all news to `news` so no need to fetch everytime when user changes the page
            setNews(_news)
        }).catch(err => console.log(err))
    }, [])

    // function to handle when a page number button is clicked to get the news accordingly
    function handlePageClick(event){
        // event.selected is the page number is selected, multiply by PER_PAGE to get the news
        setOffset(event.selected * PER_PAGE);
        window.scrollTo(0, 0)
    }

    // whenever offset is changed, change the currentPageData accordingly
    useEffect(() => {
        setCurrentPageData(Array.from(news.slice(offset, offset + PER_PAGE)))
    }, [offset])
    
    return (
        <div>
            <Navbar />
            <div className="news-main">
                <div className="news-title">
                    <h1>Forex News</h1>
                    <p>Stay up-to-date by reading latest news related to currency market</p>
                </div>
                { /* if the news is being fetched show a loading icon else nothing */ }
                {news.length > 0 ? "" : <div className="loading">
                        <ScaleLoader loading={true} color="#2460ff" size={150}/>
                        <p>Loading News</p>
                    </div>}
                <div className="news">
                    { /* map each element from currentPageData to be a <NewsSec /> component */ }
                    {currentPageData.map(article => {
                        return <NewsSec url={article.url} imgUrl={article.imgUrl} title={article.title} published={article.published} />
                    })}
                </div>
                { /* if the news is loaded show pagination else nothing */}
                {news.length > 0 ? 
                    <div className="news-pagination">
                        { /* if width is >640 then show previous and next with arrow else only text to maintain responsiveness */ }
                        { /* if the width is >640 show page range 2 and pages 3 else 1 and 1 respectively to maintain responsiveness and prevent overflow */ }
                        <ReactPaginate
                            previousLabel={windowSize.innerWidth > 640 ? "← Previous" : "Previous"}
                            nextLabel={windowSize.innerWidth > 640 ? "Next →" : "Next"}
                            pageCount={pageCount}
                            onPageChange={handlePageClick}
                            containerClassName={"pagination"}
                            previousLinkClassName={"pagination__link"}
                            nextLinkClassName={"pagination__link"}
                            disabledClassName={"pagination__link--disabled"}
                            activeClassName={"pagination__link--active"}
                            pageRangeDisplayed={windowSize.innerWidth > 640 ? 2 : 1}
                            marginPagesDisplayed={windowSize.innerWidth > 640 ? 3 : 1}
                        />
                    </div>
                : "" }
            </div>
        </div>
    )
}

export default News;