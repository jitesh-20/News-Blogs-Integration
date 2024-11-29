import React, { useState } from 'react'
import './Calendar.css'

const Calendar = () => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const monthsOfYear = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const currdate = new Date()
  const [currMonth, setcurrMonth] = useState(currdate.getMonth())
  const [currYear, setcurrYear] = useState(currdate.getFullYear())
  const daysInMonth = new Date(currYear, currMonth + 1, 0).getDate()
  const firstDayOfMonth = new Date(currYear, currMonth, 1).getDay()

  // console.log(currMonth, currYear, daysInMonth, firstDayOfMonth);

  const prevMonth = () => {
    setcurrMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1))
    setcurrYear((prevYear) => (currMonth === 0 ? prevYear - 1 : prevYear))
  }

  const nextMonth = () => {
    setcurrMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1))
    setcurrYear((prevYear) => (currMonth === 11 ? prevYear + 1 : prevYear))
  }

  return (
    <div className='calendar'>
      <div className="navigate-date">
        <h2 className="month">{monthsOfYear[currMonth]}</h2>
        <h2 className="year">{currYear}</h2>
        <div className="buttons">
          <i className="bx bx-chevron-left" onClick={prevMonth}></i>
          <i className="bx bx-chevron-right" onClick={nextMonth}></i>
        </div>
      </div>

      <div className="weekdays">
        {daysOfWeek.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>

      <div className="days">
        {[...Array(firstDayOfMonth).keys()].map((_, index) => (
          <span key={`empty-${index}`}></span>
        ))}
        {[...Array(daysInMonth).keys()].map((day) => (
          <span key={day + 1} className={
            day + 1 === currdate.getDate() && currMonth === currdate.getMonth() && currYear === currdate.getFullYear() ? 'current-day' : ''}>
            {day + 1}
          </span>
        ))}
      </div>
    </div >
  )
}

export default Calendar