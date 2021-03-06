import * as Yup from 'yup';
import { Op } from 'sequelize';

import Tool from '../models/Tool';

class ToolsController {
  async index(req, res) {
    const {
      userId: user_id,
      query: { tag },
    } = req;

    const tools = await Tool.findAll(
      tag
        ? {
            where: { user_id, tags: { [Op.contains]: [tag] } },
          }
        : { where: { user_id } }
    );

    return res.json(tools);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string(),
      link: Yup.string(),
      tags: Yup.array().of(Yup.string()),
    });

    const { userId: user_id } = req;

    try {
      await schema.validate(req.body);
    } catch (error) {
      return res.status(400).json({ error: error.errors[0] });
    }

    const tool = await Tool.create({
      ...req.body,
      user_id,
    });

    return res.status(201).json(tool);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string(),
      link: Yup.string(),
      tags: Yup.array(Yup.string()),
    });

    const {
      userId: user_id,
      params: { id },
    } = req;

    try {
      await schema.validate(req.body);
    } catch (error) {
      return res.status(400).json({ error: error.errors[0] });
    }

    const tool = await Tool.findByPk(id, { where: { user_id } });
    if (!tool) {
      return res.status(404).send();
    }
    const toolUpdated = await tool.update(req.body);

    return res.status(201).json(toolUpdated);
  }

  async delete(req, res) {
    const {
      userId: user_id,
      params: { id },
    } = req;

    const deleteds = await Tool.destroy({
      where: { user_id, id },
    });

    if (deleteds === 0) {
      return res.status(404).json({ error: 'Tool not found' });
    }

    return res.status(204).json();
  }
}

export default new ToolsController();
