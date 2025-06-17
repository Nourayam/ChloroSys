'use client';
import { useState, useEffect } from 'react';

export default function WateringCalendar() {
  const [plants, setPlants] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [view, setView] = useState('month'); // 'month' or 'week'

  // Load plants from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedPlants = localStorage.getItem('plantTrackerData');
      if (savedPlants) {
        setPlants(JSON.parse(savedPlants));
      }
    }
  }, []);

  // Get calendar data
  const getMonthData = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { year, month, daysInMonth, startingDayOfWeek };
  };

  // Calculate which plants need water on a specific date
  const getPlantsNeedingWater = (date) => {
    return plants.filter(plant => {
      const lastWatered = new Date(plant.lastWatered);
      const daysSinceWatered = Math.floor((date - lastWatered) / (1000 * 60 * 60 * 24));
      return daysSinceWatered > 0 && daysSinceWatered % plant.wateringFrequency === 0;
    });
  };

  // Get next watering date for a plant
  const getNextWateringDate = (plant) => {
    const lastWatered = new Date(plant.lastWatered);
    const nextDate = new Date(lastWatered);
    nextDate.setDate(lastWatered.getDate() + plant.wateringFrequency);
    return nextDate;
  };

  // Navigate months
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Render calendar
  const renderMonthView = () => {
    const { year, month, daysInMonth, startingDayOfWeek } = getMonthData();
    const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    const days = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      date.setHours(0, 0, 0, 0);
      const plantsToWater = getPlantsNeedingWater(date);
      const isToday = date.getTime() === today.getTime();
      const isPast = date < today;
      
      days.push(
        <div
          key={day}
          className={`calendar-day ${isToday ? 'today' : ''} ${plantsToWater.length > 0 ? 'has-plants' : ''} ${isPast ? 'past' : ''}`}
          onClick={() => setSelectedDate(date)}
        >
          <div className="day-number">{day}</div>
          {plantsToWater.length > 0 && (
            <div className="water-indicator">
              <span className="water-count">{plantsToWater.length}</span>
              <span className="water-icon">💧</span>
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="calendar-container">
        <div className="calendar-header">
          <button className="nav-btn" onClick={goToPreviousMonth}>‹</button>
          <h2 className="month-title">{monthName}</h2>
          <button className="nav-btn" onClick={goToNextMonth}>›</button>
        </div>
        
        <div className="calendar-weekdays">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="weekday">{day}</div>
          ))}
        </div>
        
        <div className="calendar-grid">
          {days}
        </div>
      </div>
    );
  };

  // Render week view
  const renderWeekView = () => {
    const startOfWeek = new Date(currentDate);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day;
    startOfWeek.setDate(diff);
    
    const weekDays = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      date.setHours(0, 0, 0, 0);
      const plantsToWater = getPlantsNeedingWater(date);
      const isToday = date.getTime() === today.getTime();
      
      weekDays.push(
        <div key={i} className={`week-day ${isToday ? 'today' : ''}`}>
          <div className="week-day-header">
            <div className="week-day-name">
              {date.toLocaleDateString('en-US', { weekday: 'short' })}
            </div>
            <div className="week-day-date">
              {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </div>
          </div>
          
          <div className="week-day-plants">
            {plantsToWater.length === 0 ? (
              <div className="no-plants">No watering needed</div>
            ) : (
              plantsToWater.map(plant => (
                <div key={plant.id} className="plant-schedule-item">
                  <span className="plant-icon">{plant.plantEmoji || '🪴'}</span>
                  <span className="plant-name-small">{plant.name}</span>
                </div>
              ))
            )}
          </div>
        </div>
      );
    }
    
    return (
      <div className="week-view">
        <div className="calendar-header">
          <button className="nav-btn" onClick={() => {
            const newDate = new Date(currentDate);
            newDate.setDate(currentDate.getDate() - 7);
            setCurrentDate(newDate);
          }}>‹</button>
          <h2 className="week-title">
            Week of {startOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </h2>
          <button className="nav-btn" onClick={() => {
            const newDate = new Date(currentDate);
            newDate.setDate(currentDate.getDate() + 7);
            setCurrentDate(newDate);
          }}>›</button>
        </div>
        
        <div className="week-grid">
          {weekDays}
        </div>
      </div>
    );
  };

  // Upcoming watering schedule
  const getUpcomingSchedule = () => {
    const schedule = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Look ahead 14 days
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const plantsToWater = getPlantsNeedingWater(date);
      
      if (plantsToWater.length > 0) {
        schedule.push({ date, plants: plantsToWater });
      }
    }
    
    return schedule;
  };

  return (
    <div className="calendar-page">
      <div className="calendar-controls">
        <div className="view-toggle">
          <button 
            className={`view-btn ${view === 'month' ? 'active' : ''}`}
            onClick={() => setView('month')}
          >
            Month View
          </button>
          <button 
            className={`view-btn ${view === 'week' ? 'active' : ''}`}
            onClick={() => setView('week')}
          >
            Week View
          </button>
        </div>
        
        <button className="today-btn" onClick={goToToday}>
          Today
        </button>
      </div>

      {view === 'month' ? renderMonthView() : renderWeekView()}

      <div className="upcoming-section">
        <h3 className="upcoming-title">🚿 Upcoming Watering Schedule</h3>
        <div className="upcoming-list">
          {getUpcomingSchedule().map(({ date, plants }, index) => (
            <div key={index} className="upcoming-day">
              <div className="upcoming-date">
                {date.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  month: 'short', 
                  day: 'numeric' 
                })}
                {date.toDateString() === new Date().toDateString() && (
                  <span className="today-badge">Today</span>
                )}
              </div>
              <div className="upcoming-plants">
                {plants.map(plant => (
                  <span key={plant.id} className="upcoming-plant">
                    {plant.plantEmoji || '🪴'} {plant.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
          {getUpcomingSchedule().length === 0 && (
            <p className="no-upcoming">No plants need watering in the next 14 days!</p>
          )}
        </div>
      </div>
    </div>
  );
}