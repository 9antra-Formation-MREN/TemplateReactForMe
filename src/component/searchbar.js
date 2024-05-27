import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import 'react-datepicker/dist/react-datepicker.css';
import { MapPin, Calendar, DollarSign, Search, X } from 'react-feather';
import '../pages/homepage/Searchbar.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported

const SearchBar = ({ showInputs, setShowInputs }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [priceRange, setPriceRange] = useState(10);
    const [showPriceRange, setShowPriceRange] = useState(false);
    const [isFree, setIsFree] = useState(false);
    const [searchText, setSearchText] = useState('');

    const locations = [
        { value: 'Ariana', label: 'Ariana' },
        { value: 'Laouina', label: 'Laouina' },
        { value: 'Tunis', label: 'Tunis' }
    ];

    const handlePriceInputClick = () => setShowPriceRange(!showPriceRange);
    const handleSearchIconClick = () => setShowInputs(!showInputs);
    const handleFreeButtonClick = () => setIsFree(!isFree);

    const customStyles = {
        control: (base, state) => ({
            ...base,
            border: 'none',
            boxShadow: 'none',
            width: '150px', /* Fixed width for location */
            '&:hover': {
                borderColor: 'none'
            }
        }),
        dropdownIndicator: base => ({
            ...base,
            display: 'none'
        })
    };

    return (
        <div className={`allSearchBar ${showInputs ? 'show' : ''}`}>
            <div className={`search-bar mt-5 ${showInputs ? 'show' : ''}`}>
                <input type="text" placeholder="Search..." className="search-input ml-3" />
                <span className="divider"></span>
                <MapPin className="iconSS" />
                <div className="location-input">
                    <Select
                        options={locations}
                        value={selectedLocation}
                        onChange={setSelectedLocation}
                        placeholder="Location"
                        styles={customStyles}
                        classNamePrefix="react-select"
                        isSearchable={true}
                    />
                </div>
              
                <Calendar className="iconSS" />
                <div className="date-picker-input">
                    <DatePicker
                        selected={selectedDate}
                        onChange={date => setSelectedDate(date)}
                        placeholderText="Date"
                        className="date-picker"
                    />
                </div>
                <span className="divider"></span>
                <DollarSign className="iconSS" />
                <div className="price-input" onClick={handlePriceInputClick}>
                    <input
                        type="text"
                        placeholder="Price"
                        readOnly
                        value={isFree ? 'FREE' : showPriceRange ? `${priceRange} TND` : 'Price'}
                    />
                    {showPriceRange && (
                        <div className="price-range-dropdown">
                            <input
                                type="range"
                                className="form-range"
                                min="10"
                                max="1000"
                                value={priceRange}
                                onChange={e => setPriceRange(e.target.value)}
                                disabled={isFree}
                            />
                            <div className="free-checkbox">
                                <button 
                                    className={`btn btn-${isFree ? 'success' : 'outline-primary'}`}
                                    onClick={handleFreeButtonClick}
                                >
                                    {isFree ? 'Selected FREE' : 'FREE'}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                <span className="divider"></span>
                <Search className="search-iconSS" />
                <span className="divider"></span>
                <Search className="search-iconSS" onClick={handleSearchIconClick} />
            </div>

            {/* Small screen search input */}
            <div className={`small-screen-search ${showInputs ? 'show' : ''}`}>
                <div className="small-screen-search-container">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="small-screen-search-input"
                    />
                    <X className="close-search-icon" onClick={handleSearchIconClick} />
                </div>
                <div className="small-screen-additional-inputs">
                    <div className="small-screen-input">
                        <MapPin size={19} className="small-screen-icon" />
                        <Select
                            options={locations}
                            value={selectedLocation}
                            onChange={setSelectedLocation}
                            placeholder="Location"
                            styles={customStyles}
                            classNamePrefix="react-select"
                            isSearchable={true}
                        />
                    </div>
                    <div className="small-screen-input">
                        <Calendar size={30}className="small-screen-icon" />
                        <DatePicker
                            selected={selectedDate}
                            onChange={date => setSelectedDate(date)}
                            placeholderText="Date"
                            className="small-screen-date-picker"
                        />
                            <span className="divider"></span>
                    </div>
                    <div className="small-screen-input">
                        <DollarSign size={17} className="small-screen-icon" />
                        <div className="small-screen-price-input" onClick={handlePriceInputClick}>
                            <input
                                type="text"
                                placeholder="Price"
                                readOnly
                                value={isFree ? 'FREE' : showPriceRange ? `${priceRange} TND` : 'Price'}
                            />
                            {showPriceRange && (
                                <div className="small-screen-price-range-dropdown">
                                    <input
                                        type="range"
                                        className="form-range"
                                        min="10"
                                        max="1000"
                                        value={priceRange}
                                        onChange={e => setPriceRange(e.target.value)}
                                        disabled={isFree}
                                    />
                                    <div className="small-screen-free-checkbox">
                                        <button 
                                            className={`btn btn-${isFree ? 'success' : 'outline-primary'}`}
                                            onClick={handleFreeButtonClick}
                                        >
                                            {isFree ? 'Selected FREE' : 'FREE'}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchBar;