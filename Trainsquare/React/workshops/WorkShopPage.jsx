import React, { useEffect, useState } from 'react';
import WorkShopTemp from './WorkShopTemp';
import { Row, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDebounce } from '../surveys/Debounce';
import * as workShop from '../../services/workShopService';
import locale from 'rc-pagination/lib/locale/en_US';
import Pagination from 'rc-pagination';
import debug from 'sabio-debug';
import './work-shop.css';

const _logger = debug.extend('workShops');
const WorkShops = () => {
    const [workshopData, setWorkshopData] = useState({
        workshops: [],
        workshopComponents: [],
        workshopsRandom: [],
        workshopRandomComponents: [],
        currentPage: 0,
        pageSize: 5,
        totalPages: 0,
    });

    const [searchInput, setSearchInput] = useState('');

    const changeHandler = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    };

    const navigate = useNavigate();
    const mapWorkshops = (workshop) => {
        return <WorkShopTemp workshopData={workshop} key={`${workshop.id}w`} />;
    };

    const onChange = (page) => {
        workShop
            .paginate(page - 1, 5)
            .then(onGetWorkShopSuccess)
            .catch(onGetWorkShopError);
        setWorkshopData((prevState) => {
            let wsd = { ...prevState };
            wsd.currentPage = page;

            return wsd;
        });
    };

    const onGetWorkShopSuccess = (data) => {
        let arrayOfWorkshops = data.item.pagedItems;
        let pageIndex = data.item.pageIndex;
        let ps = data.item.pageSize;
        let totalPages = data.item.totalPages;
        _logger('success', arrayOfWorkshops);
        setWorkshopData((prevState) => {
            const wsd = { ...prevState };
            wsd.workshops = arrayOfWorkshops;
            wsd.currentPage = pageIndex;
            wsd.pageSize = ps;
            wsd.totalPages = totalPages;
            wsd.workshopComponents = arrayOfWorkshops.map(mapWorkshops);
            return wsd;
        });
    };

    const onGetWorkShopError = (data) => {
        _logger('Error', data);
    };

    const debouncedSearchInput = useDebounce(searchInput, 500);

    useEffect(() => {
        if (searchInput.length > 0) {
            workShop
                .search(workshopData.currentPage, workshopData.pageSize, searchInput)
                .then(onGetWorkShopSuccess)
                .catch(onGetWorkShopError);
        } else {
            workShop
                .paginate(workshopData.currentPage, workshopData.pageSize)
                .then(onGetWorkShopSuccess)
                .catch(onGetWorkShopError);
        }
    }, [debouncedSearchInput]);

    const mapToList = (workshop) => {
        return (
            <React.Fragment>
                <li className="workshop-list-items" key={workshop.id}>
                    <div className="mb-3" style={{ width: '17rem' }}>
                        <img
                            src={workshop.imageUrl}
                            alt=""
                            className="img-fluid rounded-corners top-workshops"
                            onClick={() => {
                                navigate('/workshops/form', { state: workshop });
                            }}
                        />
                        <h4>{workshop.name}</h4>
                        <p className="card-text workshop-p-text">{`${workshop.shortDescription.slice(0, 55)}...`}</p>
                    </div>
                </li>
            </React.Fragment>
        );
    };

    const onGetRandomWorkShopSuccess = (data) => {
        let arrayOfWorkshops = data.items;
        _logger('random', data);
        setWorkshopData((prevState) => {
            const wsd = { ...prevState };
            wsd.workshopsRandom = arrayOfWorkshops;
            wsd.workshopRandomComponents = arrayOfWorkshops.map(mapToList);
            return wsd;
        });
    };

    const onGetRandomWorkShopError = (data) => {
        _logger('Error', data);
    };

    useEffect(() => {
        workShop.random().then(onGetRandomWorkShopSuccess).catch(onGetRandomWorkShopError);
    }, []);

    return (
        <React.Fragment>
            <div className="row">
                <Link className="col-1 " to="form">
                    <button className="btn btn-primary workshop-button-size"> Host a workshop</button>
                </Link>

                <div className="col-1">
                    {' '}
                    <Row className="searchInputs workshop-search-bar">
                        <input
                            style={{ width: '25rem' }}
                            type="text"
                            className="form-control"
                            placeholder="Search..."
                            value={searchInput}
                            onChange={changeHandler}
                        />
                    </Row>
                </div>

                <Container className="col-10" style={{ marginTop: '-10rem' }}>
                    <div className="featured-workshops-div" style={{ width: '20rem' }}>
                        <h1 className="featured-text">Check out these featured workshops</h1>
                    </div>
                    <div className="featured-workshops">
                        <ul className="workshop-scroll-container">{workshopData.workshopsRandom.map(mapToList)}</ul>
                    </div>
                    <div className="row">
                        {' '}
                        <h3 className="col">View all works</h3>{' '}
                        <Pagination
                            className="col-5"
                            onChange={onChange}
                            currentPage={workshopData.currentPage}
                            total={workshopData.totalPages * 10}
                            locale={locale}
                        />
                    </div>

                    <Row>{workshopData.workshops.map(mapWorkshops)}</Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default WorkShops;
