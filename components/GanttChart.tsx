'use client';
import { Restaurant, Booking } from '@/lib/data';

const HOUR_WIDTH = 80;
const ROW_HEIGHT = 52;
const LABEL_WIDTH = 140;

function timeToMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

export function GanttChart({ restaurant, bookings }: { restaurant: Restaurant; bookings: Booking[] }) {
  const openMin = timeToMinutes(restaurant.openTime);
  const closeMin = timeToMinutes(restaurant.closeTime === '00:00' ? '24:00' : restaurant.closeTime);
  const totalMinutes = closeMin - openMin;
  const hours: number[] = [];
  for (let h = Math.floor(openMin / 60); h <= Math.ceil(closeMin / 60); h++) {
    hours.push(h);
  }
  const totalWidth = (totalMinutes / 60) * HOUR_WIDTH;

  return (
    <div style={{ overflowX: 'auto' }}>
      <div style={{ minWidth: `${LABEL_WIDTH + totalWidth + 20}px` }}>
        {/* Time header */}
        <div style={{ display: 'flex', marginLeft: `${LABEL_WIDTH}px`, marginBottom: '8px' }}>
          {hours.map((h) => (
            <div key={h} style={{
              width: `${HOUR_WIDTH}px`,
              fontSize: '0.75rem',
              color: 'var(--color-text-subtle)',
              borderLeft: '1px solid var(--color-border)',
              paddingLeft: '4px',
              flexShrink: 0,
            }}>
              {String(h % 24).padStart(2, '0')}:00
            </div>
          ))}
        </div>

        {/* Rows */}
        {restaurant.tables.map((table, idx) => {
          const tableBookings = bookings.filter((b) => b.tableId === table.id);
          return (
            <div key={table.id} style={{
              display: 'flex',
              alignItems: 'center',
              height: `${ROW_HEIGHT}px`,
              borderBottom: idx < restaurant.tables.length - 1 ? '1px solid var(--color-border)' : 'none',
            }}>
              {/* Table label */}
              <div style={{
                width: `${LABEL_WIDTH}px`,
                flexShrink: 0,
                paddingRight: '12px',
              }}>
                <div style={{ fontSize: '0.875rem', fontWeight: '600' }}>Table {table.number}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{table.location} · {table.capacity}p</div>
              </div>

              {/* Timeline */}
              <div style={{
                position: 'relative',
                width: `${totalWidth}px`,
                height: `${ROW_HEIGHT - 8}px`,
                background: 'var(--color-surface-2)',
                borderRadius: 'var(--radius-sm)',
                overflow: 'hidden',
                flexShrink: 0,
              }}>
                {/* Hour grid lines */}
                {hours.slice(0, -1).map((h) => {
                  const left = ((h * 60 - openMin) / totalMinutes) * totalWidth;
                  return (
                    <div key={h} style={{
                      position: 'absolute',
                      left: `${left}px`,
                      top: 0,
                      bottom: 0,
                      width: '1px',
                      background: 'var(--color-border)',
                    }} />
                  );
                })}

                {/* Bookings */}
                {tableBookings.map((booking) => {
                  const startMin = timeToMinutes(booking.time);
                  const durationMin = 90;
                  const left = ((startMin - openMin) / totalMinutes) * totalWidth;
                  const width = (durationMin / totalMinutes) * totalWidth;
                  const colors = {
                    confirmed: { bg: 'rgba(76,175,130,0.25)', border: 'var(--color-success)', text: 'var(--color-success)' },
                    pending: { bg: 'rgba(245,166,35,0.25)', border: 'var(--color-warning)', text: 'var(--color-warning)' },
                    cancelled: { bg: 'rgba(232,84,84,0.15)', border: 'var(--color-error)', text: 'var(--color-error)' },
                  };
                  const color = colors[booking.status];
                  return (
                    <div
                      key={booking.id}
                      title={`${booking.userName} · ${booking.partySize} guests · ${booking.time}`}
                      style={{
                        position: 'absolute',
                        left: `${Math.max(0, left)}px`,
                        width: `${width - 2}px`,
                        top: '4px',
                        bottom: '4px',
                        background: color.bg,
                        border: `1px solid ${color.border}`,
                        borderRadius: '4px',
                        padding: '2px 6px',
                        overflow: 'hidden',
                        cursor: 'default',
                      }}
                    >
                      <div style={{ fontSize: '0.72rem', fontWeight: '600', color: color.text, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {booking.userName}
                      </div>
                      <div style={{ fontSize: '0.68rem', color: 'var(--color-text-muted)', whiteSpace: 'nowrap' }}>
                        {booking.partySize}p · {booking.time}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
