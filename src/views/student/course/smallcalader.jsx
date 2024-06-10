import React from 'react';
// import './CalendarView.css';

function CalendarView() {
  // Get the current date
  const today = new Date();
  const currentDay = today.getDay();
  const currentDate = today.getDate();

  // Days of the week
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Generate days around the current date
  const days = Array.from({ length: 7 }, (_, i) => {
    const day = new Date(today);
    day.setDate(currentDate - currentDay + i);
    return { day: daysOfWeek[day.getDay()], date: day.getDate(), isSelected: i === currentDay };
  });

  return (
    <div className="mt-8 h-48 bg-gwhite p-1">
      {/* Variation dark set */}
      <div className="flex bg-white shadow-md justify-start md:justify-center rounded-lg overflow-x-scroll mx-auto py-4 px-2 md:mx-12">
        {days.map((day, index) => (
          <div
            key={index}
            className={`flex group rounded-lg mx-1 transition-all duration-300 cursor-pointer justify-center w-16 shadow-lg ${day.isSelected ? 'dark-shadow' : 'hover:bg-blue-300 hover:shadow-lg hover-dark-shadow'}`}
  style={day.isSelected ? { backgroundColor: '#6e82a7' } : {}}
          >
            {day.isSelected && (
              <span className="flex h-3 w-3 absolute -top-1 -right-1">
                <span className="animate-ping absolute group-hover:opacity-75 opacity-0 inline-flex h-full w-full rounded-full bg-blue-200"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-100"></span>
              </span>
            )}
            <div className="flex items-center px-4 py-4">
              <div className="text-center">
                <p className={`text-sm ${day.isSelected ? 'text-gray-100' : 'text-gray-900 group-hover:text-gray-100'} transition-all duration-300`}>{day.day}</p>
                <p className={`mt-3 ${day.isSelected ? 'text-gray-100 font-bold' : 'text-gray-900 group-hover:text-gray-100 group-hover:font-bold'} transition-all duration-300`}>{day.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <br /><br />

      {/* Variation light set */}
      
    </div>
  );
}

export default CalendarView;
