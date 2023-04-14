import React from 'react'
import Navbar from '../components/Navbar';
import { useState } from 'react';
import SearchItem from '../components/SearchItem';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import * as locales from "react-date-range/dist/locale";
import { DateRange } from 'react-date-range';
import format from 'date-fns/format';
import "./hotelList.scss"
import { useLocation } from 'react-router-dom';

const HotelList = () => {
  const locationSearchBarData =useLocation()
  const [openConditions, setOpenConditions] = useState(false);
  const [openCalendar, setOpenCalendar] = useState(false);
  console.log(locationSearchBarData);
  const [destination, setDestination] = useState(locationSearchBarData.state?.destination);
  const [dates, setDates] = useState(locationSearchBarData.state?.dates);
  const [conditions, setConditions] = useState(locationSearchBarData.state?.conditions);
  // function 
  const handleCounter = (name, sign) => {
    setConditions(prev => {
      return {
        ...prev,
        [name]: sign === "increase" ? conditions[name] + 1 : conditions[name] - 1
      }
    })
  }
  return (
    <div>
      <Navbar />
      <div className='listContainer'>
        <div className='listWrapper'>
          <div className='listSearch'>
            <div className='listTitle'>搜尋</div>
            <div className='listItem'>
              <label>目的地/住宿名稱:</label>
              <input type="text" className='searchInput' placeholder={destination === "" ? '要去哪裡?' : destination} onChange={(e) => setDestination(e.target.value)}/>
            </div>
            <div className='listItem'>
              <label>入住/退房日期: {format(dates[0].startDate, "MM/dd/yyyy")} - {format(dates[0].endDate, "MM/dd/yyyy")}</label>
              <span className='dates' ><div className="searchInput" onClick={() => setOpenCalendar(!openCalendar)} >入住時間 - 退房時間</div>
                {openCalendar && <DateRange
                  editableDateInputs={true}
                  onChange={item => setDates([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={dates}
                  className="date"
                  minDate={new Date()}
                  locale={locales['zhTW']}
                />}
              </span>
            </div>
            <div className='listItem'>
              <div className='listItemLimitPrice'>
                <label>每晚最低價格</label>
                <input type="text" className='searchInput' />

              </div>
              <div className='listItemLimitPrice'>
                <label>每晚最低價格</label>
                <input type="text" className='searchInput' />
              </div>
            </div>
            <div className='listItemConditions'>
              <span className="SearchText" onClick={() => setOpenConditions(!openConditions)}>{conditions.adult}位成人 · {conditions.children} 位小孩 · {conditions.room} 間房</span>
              {openConditions &&
                <div className='ConditionsContainer'>
                  <div className='condition'>
                    成人
                    <div className='conditionCounter'>
                      <button className='conditionCounterButton' disabled={conditions.adult <= 1} onClick={() => handleCounter("adult", "decrease")}> - </button>
                      <span className='number'>{conditions.adult}</span>
                      <button className='conditionCounterButton' onClick={() => handleCounter("adult", "increase")}> + </button>
                    </div>
                  </div>
                  <div className='condition'>
                    小孩
                    <div className='conditionCounter'>
                      <button className='conditionCounterButton' disabled={conditions.children <= 0} onClick={() => handleCounter("children", "decrease")}> - </button>
                      <span className='number'>{conditions.children}</span>
                      <button className='conditionCounterButton' onClick={() => handleCounter("children", "increase")}> + </button>
                    </div>
                  </div>
                  <div className='condition'>
                    房間
                    <div className='conditionCounter'>
                      <button className='conditionCounterButton' disabled={conditions.room <= 1} onClick={() => handleCounter("room", "decrease")}> - </button>
                      <span className='number'>{conditions.room}</span>
                      <button className='conditionCounterButton' onClick={() => handleCounter("room", "increase")}> + </button>
                    </div>
                  </div>
                </div>
              }
            </div>
            <div className='listItem'>
              <button className='searchbtn'>搜尋</button>
            </div>
          </div>
          <div className='listResult'>
            <div className='resultTitle'>
              <h2>在台北找到505間房間</h2>
              <div className='map'>
                <button>在地圖上顯示</button>
              </div>
            </div>
            <SearchItem active="active" />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HotelList