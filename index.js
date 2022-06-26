import express from "express";

const app = express();
app.use(express.json());

const rooms=[{
    "room_id":1,
    "customer_name":"",
    "room_name":"A1",
    "no_of_seats":4,
    "booked_status":false,
    "date":"",
    "start_time":"",
    "end_time" :"",
   
 },
 {
    "room_id":2,
     "customer_name":"",
     "room_name":"A2",
     "no_of_seats":5,
     "booking_status":false,
     "date":"",
     "start_time":"",
     "end_time" :""
  },
  {
    "room_id":3,
     "customer_name":"",
     "room_name":"B1",
     "no_of_seats":6,
     "booking_status": false,
     "date":"",
     "start_time":"",
     "end_time" :""
  },
  {
    "room_id":4,
     "customer_name":"",
     "room_name":"B2",
     "no_of_seats":7,
     "booking_status":false,
     "date":"",
     "start_time":"",
     "end_time" :""
  },
  {
    "room_id":5,
     "customer_name":"Ajith",
     "room_name":"c1",
     "no_of_seats":7,
     "booking_status":true,
     "date":"",
     "start_time":"",
     "end_time" :"",
  }
 ];


//create rooms
// const rooms = [];
app.post("/createroom", async (req, res) => {
  req.body.id = rooms.length + 1;
  req.body.booking_status = false;
  let data = await req.body;
  rooms.push(data);
  // console.log(rooms)
  res.send(rooms);
});

//Booking a room
app.post("/bookroom/:id", (req, res) => {
  let data = req.body;
  let { id } = req.params;

  if (rooms[id].booking_status === false) {
    let { customer_name, Date, Start_Time, End_Time } = data;
    rooms[id].customer_name = customer_name;
    rooms[id].Date = Date;
    rooms[id].Start_Time = Start_Time;
    rooms[id].End_Time = End_Time;
    rooms[id].booking_status = true;
    console.log(rooms);
    res.send(`The room ${id} booked successfully`);
  } else {
    res.send(`The room ${id} is already booked`);
  }
});

app.get("/rooms" , (req,res) =>{
  res.send(rooms);
})

app.get("/customers" , (req,res) => {
  const customers = rooms.filter(room => room.booking_status == true);
  const filteredcustomers = customers.map((customer) => {
    return {
        name: customer.customer_name,
        room_name: customer.room_name,
        date: customer.date,
        start_time: customer.Start_Time,
        end_time: customer.End_Time
    }
}
)
res.send(filteredcustomers)
})

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`server started in ${PORT}`);
});
