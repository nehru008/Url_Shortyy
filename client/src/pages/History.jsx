import React from "react";

const History = () => {
  return (
    <div>
      <h1>URL History</h1>

      <table>
        <thead>
          <tr>
            <th>Original URL</th>
            <th>Short URL</th>
            <th>Clicks</th>
            <th>Created At</th>
          </tr>
        </thead>

        <tbody>
          {/* Map URLs here */}
        </tbody>
      </table>
    </div>
  );
};

export default History;