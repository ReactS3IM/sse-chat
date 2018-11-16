<?php

declare(strict_types=1);

namespace App\Subscriber;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\DTO\SendChatMessage;
use App\Provider\JWTProvider;
use Http\Client\HttpClient;
use Http\Message\MessageFactory;
use Lcobucci\JWT\Builder;
use Lcobucci\JWT\Signer;
use Ramsey\Uuid\Uuid;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Event\GetResponseForControllerResultEvent;
use Symfony\Component\HttpKernel\KernelEvents;

class SendChatMessageSubscriber implements EventSubscriberInterface
{
    /**
     * @var HttpClient
     */
    private $httpClient;

    /**
     * @var MessageFactory
     */
    private $httpMessageFactory;

    /**
     * @var string
     */
    private $mercureHub;

    /**
     * @var JWTProvider
     */
    private $JWTProvider;

    public function __construct(
        HttpClient $httpClient,
        MessageFactory $httpMessageFactory,
        JWTProvider $JWTProvider,
        string $mercureHub
    )
    {
        $this->httpClient         = $httpClient;
        $this->httpMessageFactory = $httpMessageFactory;
        $this->mercureHub         = $mercureHub;
        $this->JWTProvider        = $JWTProvider;
    }

    public function sendChatMessage(GetResponseForControllerResultEvent $event)
    {
        $sendChatMessage = $event->getControllerResult();
        if (!$sendChatMessage instanceof SendChatMessage) {
            return;
        }

        $request = $this->httpMessageFactory->createRequest(
            'POST',
            $this->mercureHub,
            [
                'Authorization' => 'Bearer ' . $this->JWTProvider->getToken(),
                'Content-Type'  => 'application/x-www-form-urlencoded',
            ],
            http_build_query([
                'topic' => 'general',
                'data'  => json_encode([
                    'id'      => Uuid::uuid4(),
                    'date'    => (new \DateTimeImmutable)->format('c'),
                    'author'  => $sendChatMessage->author,
                    'message' => $sendChatMessage->message,
                ]),
            ])
        );
        $this->httpClient->sendRequest($request);

        $event->setResponse(new JsonResponse(null, 204));
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['sendChatMessage', EventPriorities::POST_VALIDATE],
        ];
    }
}
