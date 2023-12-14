import express from "express";

import { sendResponse } from "../Helpers/helper.js";
import UserModel from "../Models/Usermodel.js";

const route = express.Router();

// Get All Users with Pagination

route.get("/", async (req, res) => {
  const PAGE_SIZE = 5;
  const page = parseInt(req.query.page || "0");

  try {
    const total = await UserModel.countDocuments({});
    const users = await UserModel.find({})
      .limit(PAGE_SIZE)
      .skip(PAGE_SIZE * page);

    res.json({
      totalPages: Math.ceil(total / PAGE_SIZE),
      users
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(sendResponse(false, null, "Internal Server Error"));
  }
});

// Search Users by Name within the current page

route.get("/search", async (req, res) => {
  const PAGE_SIZE = 5;
  const page = parseInt(req.query.page || "0");
  const name = req.query.name || "";

  try {
    const query = UserModel.find({});
    const countQuery = UserModel.countDocuments({});

    if (name) {
      query.where("Name", new RegExp(name, "i"));
      countQuery.where("Name", new RegExp(name, "i"));
    }

    const total = await countQuery.exec();
    const users = await query.exec();
    const startIndex = PAGE_SIZE * page;
    const endIndex = startIndex + PAGE_SIZE;
    const results = users.slice(startIndex, endIndex);

    res.json({
      totalPages: Math.ceil(total / PAGE_SIZE),
      users: results
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(sendResponse(false, null, "Internal Server Error"));
  }
});

// Post a User
route.post("/", async (req, res) => {
  let { Name, FatherName, Email, Age } = req.body;

  try {
    let errArr = [];
    if (!Name) {
      errArr.push("Required: Name");
    }
    if (!FatherName) {
      errArr.push("Required: FatherName");
    }
    if (!Email) {
      errArr.push("Required: Email");
    }
    if (!Age) {
      errArr.push("Required: Age");
    }
    if (errArr.length > 0) {
      res
        .status(400)
        .send(sendResponse(false, errArr, null, "Required All Fields"));
      return;
    } else {
      let obj = { Name, FatherName, Email, Age };
      let user = new UserModel(obj);
      await user.save();
      if (!user) {
        res.status(500).send(sendResponse(false, null, "Failed to save data"));
      } else {
        res.status(200).send(sendResponse(true, user, "Saved Successfully"));
      }
    }
  } catch (e) {
    console.error(e);
    res.status(500).send(sendResponse(false, null, "Internal Server Error"));
  }
});

export default route;









// import express from "express";

// import { sendResponse } from "../Helpers/helper.js";
// import UserModel from "../Models/Usermodel.js";
// const route = express.Router();

// //----------------------------Get All------------------




// route.get("/", async (req, res) => {
  
// const PAGE_SIZE = 5;
// const page = parseInt(req.query.page || "0");
// const total = await UserModel.countDocuments({});
// const users = await UserModel.find({})
//   .limit(PAGE_SIZE)
//   .skip(PAGE_SIZE * page);
// res.json({
//   totalPages: Math.ceil(total / PAGE_SIZE),
//   users
// });
// });

// //--------------------------Post----------------------------

// route.post("/", async (req, res) => {
//   let { Name, FatherName, Email, Age } = req.body;
//   try {
//     let errArr = [];
//     if (!Name) {
//       errArr.push("Required: Name");
//     }
//     if (!FatherName) {
//       errArr.push("Required: FatherName");
//     }
//     if (!Email) {
//       errArr.push("Required: Email");
//     }
//     if (!Age) {
//       errArr.push("Required: Age");
//     }
//     if (errArr.length > 0) {
//       res
//         .status(400)
//         .send(sendResponse(false, errArr, null, "Required All Fields"));
//       return;
//     } else {
//       let obj = { Name, FatherName, Email, Age };
//       let user = new UserModel(obj);
//       await user.save();
//       if (!user) {
//         res.status(500).send(sendResponse(false, null, "Failed to save data"));
//       } else {
//         res.status(200).send(sendResponse(true, user, "Saved Successfully"));
//       }
//     }
//   } catch (e) {
//     console.error(e);
//     res.status(500).send(sendResponse(false, null, "Internal Server Error"));
//   }
// });

// export default route;
