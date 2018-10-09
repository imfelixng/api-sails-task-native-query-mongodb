/**
 * TaskController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
let db = Task.getDatastore().manager;
let ObjectID = Task.getDatastore().driver.mongodb.ObjectID;
module.exports = {
  
    getTasks: async (req, res) => {
        try {
            let tasks = await db.collection('task').find({}).toArray();
            return res.status(200).send(tasks);
        } catch (error) {
            return res.status(500).send({success: false, error});
        }
    },
    getTask: async (req, res) => {
        let id = req.params.id;
        let taskID = new ObjectID(id);
        try {
            let task = await db.collection('task').findOne({_id: taskID});
            return res.status(200).send(task);
        } catch (error) {
            return res.status(500).send({success: false, error});
        }

    },
    createTask: async (req, res) => {
        let text = req.body.text;
        try {
            await db.collection('task').insertOne({text, status: false});
            return res.status(200).send({
                success: true,
                message: 'Task created',
            });
        } catch (error) {
            return res.status(500).send({success: false, error});
        }

    },
    updateTask: async (req, res) => {
        let text = req.body.text;
        let id = req.params.id;
        let taskID = new ObjectID(id);
        try {
            await db.collection('task').updateOne({_id: taskID},{text});
            return res.send({
                success: true,
                message: 'Task updated',
            });
        } catch (error) {
            return res.status(500).send({success: false, error});
        }
    },
    deleteTask: async(req, res) => {
        let id = req.params.id;
        let taskID = new ObjectID(id);
        try {
            await db.collection('task').deleteOne({_id: taskID});
            return res.send({
                success: true,
                message: 'Task deleted',
            });
        } catch (error) {
            return res.status(500).send({success: false, error});
        }

    }

};

