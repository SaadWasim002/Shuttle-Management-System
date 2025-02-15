import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

const Driver = ({ bookings }) => {
  const [drivers, setDrivers] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [timeRange] = useState([600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000, 2100, 2200]);

  const timeToNumber = (timeStr) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 100 + minutes;
  };

  useEffect(() => {
    const generateSchedules = () => {
      const baseDrivers = [
        { id: 1, name: 'Samuel Jones', status: 'Online', schedule: [] },
        { id: 2, name: 'Bob Jones', status: 'Offline', schedule: [] },
        { id: 3, name: 'Jonathan Spikes', status: 'Offline', schedule: [] }
      ];

      bookings.forEach((booking, index) => {
        if (!['Accepted', 'Completed', 'On Going', 'Dropped'].includes(booking.status)) return;

        const driverIndex = index % baseDrivers.length;
        const driver = baseDrivers[driverIndex];
        
        const pickupTime = timeToNumber(booking.requestedPickup);
        const dropTime = timeToNumber(booking.plannedDrop);

        if (!isNaN(pickupTime)) {
          driver.schedule.push({
            type: 'pickup',
            start: pickupTime - 30,
            end: pickupTime,
            bookingId: booking.id
          });
        }

        if (!isNaN(dropTime)) {
          driver.schedule.push({
            type: 'drop',
            start: dropTime - 30,
            end: dropTime,
            bookingId: booking.id
          });
        }
      });

      baseDrivers.forEach(driver => {
        const validEvents = driver.schedule.filter(event => !isNaN(event.start));
        const sortedSchedule = validEvents.sort((a, b) => a.start - b.start);
        
        let dutyStart = sortedSchedule[0]?.start || 900;
        let dutyEnd = sortedSchedule[sortedSchedule.length - 1]?.end || 1700;

        driver.schedule = [{
          type: 'duty',
          start: dutyStart,
          end: dutyEnd
        }, ...sortedSchedule];

        let breakTime = dutyStart + 400;
        while (breakTime < dutyEnd) {
          driver.schedule.push({
            type: 'break',
            start: breakTime,
            end: breakTime + 30
          });
          breakTime += 400;
        }

        driver.schedule.sort((a, b) => a.start - b.start);
      });

      setDrivers(baseDrivers);
    };

    generateSchedules();
  }, [bookings]);

  const formatTime = (time) => {
    const hours = Math.floor(time / 100);
    const minutes = time % 100;
    const date = new Date();
    date.setHours(hours, minutes);
    return format(date, 'HH:mm');
  };

  const getScheduleBlock = (driver, time) => {
    const schedule = driver.schedule.find(s => time >= s.start && time < s.end);
    if (!schedule) return null;

    const colorMap = {
      duty: '#3B82F6',
      break: '#EF4444',
      pickup: '#10B981',
      drop: '#F59E0B'
    };

    const blockWidth = ((schedule.end - schedule.start) / 100) * 6.25;
    const positionOffset = ((schedule.start - time) / 100) * 6.25;

    return (
      <div 
        className="text-white p-1 rounded text-sm font-medium"
        style={{ 
          backgroundColor: colorMap[schedule.type],
          width: `${blockWidth}%`,
          minWidth: '60px',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          position: 'absolute',
          left: `${positionOffset}%`,
          zIndex: 2
        }}
      >
        {schedule.type.toUpperCase()}
      </div>
    );
  };

  const filteredDrivers = drivers.filter(driver =>
    driver.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container-fluid p-4">
      <h2 className="mb-4">Driver Management</h2>
      
      <div className="mb-3">
        <input 
          type="text" 
          placeholder="Search driver" 
          className="form-control"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="row">
        <div className="col-md-3">
          <div className="list-group">
            {filteredDrivers.map(driver => (
              <button
                key={driver.id}
                className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ${
                  selectedDriver?.id === driver.id ? 'active' : ''
                }`}
                onClick={() => setSelectedDriver(driver)}
              >
                {driver.name}
                <span className={`badge ${driver.status === 'Online' ? 'bg-success' : 'bg-secondary'}`}>
                  {driver.status}
                </span>
              </button>
            ))}
          </div>
          
          <div className="mt-3">
            <button className="btn btn-outline-primary w-100 mb-2">Start Duty</button>
            <button className="btn btn-outline-danger w-100 mb-2">End Duty</button>
            <button className="btn btn-outline-warning w-100">Add Break</button>
          </div>
        </div>

        <div className="col-md-9">
          <div className="timeline-container" style={{ overflowX: 'auto' }}>
            <div className="d-flex mb-2" style={{ minWidth: `${timeRange.length * 75}px` }}>
              {timeRange.map(time => (
                <div 
                  key={time}
                  className="text-center border-end"
                  style={{ width: '75px' }}
                >
                  {formatTime(time)}
                </div>
              ))}
            </div>

            {filteredDrivers.map(driver => (
              <div 
                key={driver.id}
                className="d-flex mb-3 align-items-center position-relative"
                style={{ 
                  minWidth: `${timeRange.length * 75}px`, 
                  height: '60px',
                  backgroundColor: '#F3F4F6'
                }}
              >
                {timeRange.map(time => (
                  <div
                    key={time}
                    className="border-end h-100"
                    style={{ 
                      width: '75px',
                      position: 'relative'
                    }}
                  >
                    {getScheduleBlock(driver, time)}
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="mt-4">
            <h5>Schedule Details - {format(new Date(), 'MMM dd, yyyy')}</h5>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Duty Start</th>
                  <th>Duty End</th>
                  <th>Pickup/Drop</th>
                  <th>Break</th>
                  <th>Vehicle Change</th>
                </tr>
              </thead>
              <tbody>
                {selectedDriver?.schedule.map((schedule, index) => (
                  <tr key={index}>
                    <td>{formatTime(schedule.start)}</td>
                    <td>{formatTime(schedule.end)}</td>
                    <td>{['pickup', 'drop'].includes(schedule.type) ? schedule.type.charAt(0).toUpperCase() + schedule.type.slice(1) : '-'}</td>
                    <td>{schedule.type === 'break' ? '30 mins' : '-'}</td>
                    <td>-</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Driver;