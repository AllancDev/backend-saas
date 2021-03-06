"use strict";

/**
 * Resourceful controller for interacting with teams
 */

class TeamController {
  /**
   * Show a list of all teams.
   * GET teams
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ auth }) {
    const teams = await auth.user.teams().fetch();

    return teams;
  }

  /**
   * Render a form to be used for creating a new team.
   * GET teams/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */

  async store({ request, auth }) {
    const data = request.only(["name"]);
    const team = await auth.user.teams().create({
      ...data,
      user_id: auth.user.id
    });

    return team;
  }

  /**
   * Display a single team.
   * GET teams/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, auth }) {
    const team = await auth.user
      .teams()
      .where("teams.id", params.id)
      .first();
    return team;
  }

  /**
   * Update team details.
   * PUT or PATCH teams/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, auth }) {
    const data = request.only(["name"]);
    const team = await auth.user
      .teams()
      .where("teams.id", params.id)
      .first();

    team.merge(data);

    await team.save();

    return team;
  }

  async destroy({ params, request, auth }) {
    const team = await auth.user
      .teams()
      .where("teams.id", params.id)
      .first();

      await team.delete();
  }
}

module.exports = TeamController;
