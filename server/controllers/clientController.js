const UserModel = require("../models/user");
const ClientModel = require("../models/client");
class Client {
  async create(req, res) {
    try {
      const { name, surname, other, date, account } = req.body;
      console.log(account, name, surname, other, date);
      const newClient = new ClientModel({
        account,
        name,
        surname,
        other,
        date,
      });

      await newClient.save();
      await UserModel.findByIdAndUpdate(
        { _id: req.userId },
        {
          $push: {
            clients: newClient,
          },
        }
      );
      res.json(newClient);
    } catch (error) {
      console.log(error);
      res.json({ message: "Error" });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      console.log(id);
      const client = await ClientModel.findById({ _id: id });

      client.status = status;

      await client.save();
      console.log("eeee");
      res.json(client);
    } catch (error) {
      res.json({ message: "Error" });
    }
  }

  async getMyClients(req, res) {
    try {
      const user = await UserModel.findById({ _id: req.userId });
      const list = await Promise.all(
        user.clients.map((client) => {
          return ClientModel.findById({ _id: client._id });
        })
      );
      console.log(list);
      res.json(list);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new Client();
