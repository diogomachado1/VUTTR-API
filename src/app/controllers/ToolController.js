import * as Yup from 'yup';

import Tool from '../models/Tool';

class MeetupController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string(),
      link: Yup.string(),
    });

    try {
      await schema.validate(req.body);
    } catch (error) {
      return res.status(400).json({ error: error.errors[0] });
    }

    const tool = await Tool.create({
      ...req.body,
      user_id: req.userId,
    });

    return res.json(tool);
  }
}

export default new MeetupController();
