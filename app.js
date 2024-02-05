const express = require('express');
const app = express();
const PORT = process.env.PORT || 8081;
const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));

app.get('/api/:date?', (req, res) => {
  const validDate = getValidDate(req.params.date);

  if (!validDate) {
    return res.json({error: "Invalid Date"});
  }

  const result = {
    unix: validDate.getTime(),
    utc: validDate.toUTCString()
  };

  return res.json(result);
})

const getValidDate = (dateString) => {
  if (!dateString) {
    return new Date();
  } else {
    const date = new Date(Number(dateString) || dateString);
    const timestamp = date.getTime();

    if (typeof timestamp !== 'number' || Number.isNaN(timestamp)) {
      return null;
    }

    return date;
  }
};

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
