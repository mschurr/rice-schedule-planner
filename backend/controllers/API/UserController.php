<?php

class UserController extends Controller {
  protected /*SchedulePlannerProtocolMessageUtility*/ $utility;

  public function autorun() {
    $this->utility = new SchedulePlannerProtocolMessageUtility($this->database);
  }

  public function get() {
    $message = $this->utility->createUserModel($this->session);
    $this->response->json(ProtocolMessage::serialize($message), true);
  }

  public function post() {
    // NOTE: We don't catch exceptions, because the framework will catch them and display a 400 Bad Request error.
    $message = ProtocolMessage::unserialize($this->request->post['_proto']);

    if ($message->userId != $this->user->id) {
      return 400;
    }

    if (!$this->utility->checkXsrfToken($this->session, $message->xsrfToken)) {
      return 400;
    }

    // TODO(mschurr@): Update database based on the following properties:
    $this->user->setProperty(SchedulePlannerProtocolMessageUtility::TOUR_PROPERTY, $mesage->hasSeenTour === true);
    //public /*PlaygroundProtocolMessage*/ $playground;
    //public /*ScheduleProtocolMessage */ $schedule;

    return 200;
  }
}
