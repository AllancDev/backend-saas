"use strict";

const Mail = use("Mail");

class InvitationEmail {
  static get concurrency() {
    return 1;
  }

  static get key() {
    return "InvitationEmail-job";
  }

  async handle({ user, team, email }) {
    await Mail.send(
      ["emails.invitation"],
      { team: team.name, user: user.name },
      message => {
        message
          .to(email)
          .from("comercial@logfy.net.br", "Comercial | Logfy")
          .subject(`Convite para o time ${team.name}`);
      }


    );
  }
}

module.exports = InvitationEmail;
