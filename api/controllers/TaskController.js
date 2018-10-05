/**
 * TaskController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    getTasks: async (req, res) => {
        try {
            let tasks = await Task.find({});
            return res.status(200).send(tasks);
        } catch (error) {
            return res.status(500).send({success: false, error});
        }
    },
    getTask: async (req, res) => {
        let id = req.params.id;
        try {
            let task = await Task.findOne({id});
            return res.status(200).send(task);
        } catch (error) {
            return res.status(500).send({success: false, error});
        }

    },
    createTask: async (req, res) => {
        let text = req.body.text;
        try {
            let taskCreate = await Task.create({text, status: false}).fetch();
            return res.status(200).send({
                success: true,
                message: 'Task created',
                taskCreate
            });
        } catch (error) {
            return res.status(500).send({success: false, error});
        }

    },
    updateTask: async (req, res) => {
        let text = req.body.text;
        let id = req.params.id;
        try {
            let taskUpdate = await Task.update({id}).set({text}).fetch();
            return res.send({
                success: true,
                message: 'Task created',
                taskUpdate
            });
        } catch (error) {
            return res.status(500).send({success: false, error});
        }
    },
    deleteTask: async(req, res) => {
        let id = req.params.id;

        try {
            let taskDelete = await Task.destroy({id}).fetch();
            return res.send({
                success: true,
                message: 'Task delete',
                taskDelete
            });
        } catch (error) {
            return res.status(500).send({success: false, error});
        }

    }

};

