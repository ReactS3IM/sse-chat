<?php

declare(strict_types=1);

namespace App\Controller;

use App\Provider\JWTProvider;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Twig\Environment;

class DiscoverController
{
    /**
     * @var JWTProvider
     */
    private $JWTProvider;

    /**
     * @var Environment
     */
    private $twig;

    public function __construct(JWTProvider $JWTProvider, Environment $twig)
    {
        $this->JWTProvider = $JWTProvider;
        $this->twig        = $twig;
    }

    /**
     * @Route("/")
     *
     * @return Response
     */
    public function discoverAction(): Response
    {
        $response = new Response(
            $this->twig->render('index.html.twig'),
            200,
            [
                'Link' => '<https://example.com/hub>; rel="mercure"',
            ]
        );

        $response->headers->setCookie(new Cookie('mercureAuthorization', $this->JWTProvider->getToken()));

        return $response;
    }
}
