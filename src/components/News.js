import Navbar from './Navbar.js';
import '../styles/news.css';
import '../styles/pagination.css';
import ScaleLoader from "react-spinners/ScaleLoader";
import { useState, useEffect } from "react";
import axios from "axios";
import NewsSec from './NewsSec.js';
import ReactPaginate from 'react-paginate';

function News(){
    const getWindowSize = () => {
        const {innerWidth, innerHeight} = window;
        return {innerWidth, innerHeight};
    }

    const BASE = "https://newsapi.org/v2/everything";
    const API_KEY = "";
    const [news, setNews] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const PER_PAGE = 12;
    const [offset, setOffset] = useState(0);
    const [currentPageData, setCurrentPageData] = useState([])
    const [pageCount, setPageCount] = useState(0)
    const [windowSize, setWindowSize] = useState(getWindowSize());

    useEffect(() => {

        function handleWindowResize() {
            setWindowSize(getWindowSize());
        }

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    useEffect(() => {
        axios.get(BASE, {
            params: {
                language: "en",
                apiKey: API_KEY,
                q: "forex"
            }
        }).then(res => {
            setPageCount(Math.ceil(res.data['articles'].length / PER_PAGE))
            const _news = Array.from(res.data['articles'].map(article => {
                return {"published": article['publishedAt'], "url": article["url"], "imgUrl": article["urlToImage"], "title": article["title"]}
            }));
            _news.sort(function (a, b){
                return Date.parse(b.published) - Date.parse(a.published)
            })
            setCurrentPageData(_news.slice(offset, offset + PER_PAGE))
            setNews(_news)
        }).catch(err => console.log(err))
    }, [])

    function handlePageClick(event){
        setOffset(event.selected * PER_PAGE);
        window.scrollTo(0, 0)
    }

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
                {news.length > 0 ? "" : <div className="loading">
                        <ScaleLoader loading={true} color="#2460ff" size={150}/>
                        <p>Loading News</p>
                    </div>}
                <div className="news">
                    
                    {currentPageData.map(article => {
                        return <NewsSec url={article.url} imgUrl={article.imgUrl} title={article.title} published={article.published} />
                    })}
                </div>
                {news.length > 0 ? 
                    <div className="news-pagination">
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