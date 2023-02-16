const xtend = require("xtend");
const {
  Record,
  Staff,
  Attachment,
  Order,
  Driver,
  User,
  Products,
  gridProducts,
  Delivery,
  Cafe,
  Banners,
  Places,
} = require("../models");
const Utils = require("../utils");

module.exports.findCategories = async function findCategories(category, query) {
  const GetData = async function (Category, fields = [], populate = []) {
    // clean query, remove irrelevant props
    const q = xtend(query, {
      offset: undefined,
      limit: undefined,
      sorter: undefined,
    });

    const modal = Category.find(Utils.cleanObject(q))
      .skip(query.offset)
      .limit(query.limit)
      .select(fields)
      .sort([
        [
          query.sorter ? query.sorter.field : "updatedAt",
          query.sorter && /ascend/.test(query.sorter.order)
            ? "ascending"
            : "descending",
        ],
      ])
      .populate(populate);

    const [data, total] = await Promise.all([
      modal.exec(),
      Category.countDocuments(q),
    ]);

    return { data, total };
  };

  switch (category) {
    case "staff": {
      return await GetData(Staff);
    }

    case "attachments": {
      return await GetData(Attachment);
    }

    case "banners": {
      return await GetData(Banners);
    }

    case "products": {
      return await GetData(Products);
    }

    case "gridProducts": {
      return await GetData(gridProducts);
    }

    case "records": {
      return await GetData(Record);
    }

    case "orders": {
      // let [moving, delivery] = await Promise.all([
      //   GetData(Order, [], ["user"]),
      //   GetData(Delivery, [], ["user"]),
      // ]);
      // console.log(moving, delivery);
      // const allOrders = moving.data.concat(delivery.data);
      // return { data: allOrders, total: moving.total + delivery.total };
      return await GetData(Order);


    }

    case "movingOrders":
      return await GetData(Order, [], ["user"]);

    case "deliveryOrders":
      return await GetData(Delivery, [], ["user"]);

    case "users": {
      return await GetData(User);
    }
    case "drivers": {
      return await GetData(Driver);
    }
    case "places": {
      return await GetData(Places);
    }
    case "cafeOrders":
      return await GetData(Order, [], ["userId"]);

    default: {
      return { data: [], total: 0 };
    }
  }
};

module.exports.findCategory = async function findCategories(params) {
  // const GetData = async function (Category) {
  //   const category = await Category.findById(params.id);
  //   return category;
  // };
  console.log(params);
  const GetData = async function (Category) {
    const category = await Category.find({ category: params.id });
    console.log(category, "dhhdhdddh");
    return category;
  };

  switch (params.id) {
    case "records": {
      return await GetData(Record);
    }
    case "Beverages": {
      return await GetData(Products);
    }
    case "Eats": {
      return await GetData(Products);
    }
    case "Banners": {
      return await GetData(Products);
    }
    default: {
      return {};
    }
  }
};
