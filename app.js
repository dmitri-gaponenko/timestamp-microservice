const express = require('express');
const app = express();
const PORT = process.env.PORT || 8081;

app.get('/api/:date?', (req, res) => {
  const validDate = getValidDate(req.params.date);

  if (!validDate) {
    return res.json({"error": "Invalid Date"});
  }

  const result = {
    "unix": validDate.getTime(),
    "utc": validDate.toUTCString()
  };

  return res.json(result);
})

const getValidDate = (dateString) => {
  if (!dateString) {
    return new Date();
  } else if (Number(dateString)) {
    const date = new Date(Number(dateString));
    const timestamp = date.getTime();

    if (typeof timestamp !== 'number' || Number.isNaN(timestamp)) {
      return null;
    }

    return date;
  } else {
    const regex = /^\d{4}-\d{2}-\d{2}$/;

    if (dateString.match(regex) === null) {
      return null;
    }

    const date = new Date(dateString);
    const timestamp = date.getTime();

    if (typeof timestamp !== 'number' || Number.isNaN(timestamp)) {
      return null;
    }

    return date.toISOString().startsWith(dateString) ? date : null;
  }
};

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
