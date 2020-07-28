<?php
namespace Drupal\dsu_security\EventSubscriber;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\GetResponseForExceptionEvent;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\KernelEvents;

class UserProfileErrorMessageSubscriber implements EventSubscriberInterface {

    const USER_PATH_FRAGMENT = "/user/";
    const EVENT_LISTENER_METHOD = 'RespondForbiddenAsNotFound';
    public function RespondForbiddenAsNotFound(GetResponseForExceptionEvent $event) {

        $request = $event->getRequest();
        $exception = $event->getException();
        if( $exception instanceof AccessDeniedHttpException
            && stripos($request->getPathInfo(),UserProfileErrorMessageSubscriber::USER_PATH_FRAGMENT) !== false) {
                $event->setException(new NotFoundHttpException());
        }
    }

    public static function getSubscribedEvents() {
        $events[KernelEvents::EXCEPTION][] = array(UserProfileErrorMessageSubscriber::EVENT_LISTENER_METHOD, 100);
        return $events;
    }

}