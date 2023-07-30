<?php

namespace App\Filters;

use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\CLI\CLI;
use Config\Services;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class OnlyMe implements FilterInterface
{
    /**
     * Do whatever processing this filter needs to do.
     * By default it should not return anything during
     * normal execution. However, when an abnormal state
     * is found, it should return an instance of
     * CodeIgniter\HTTP\Response. If it does, script
     * execution will end and that Response will be
     * sent back to the client, allowing for error pages,
     * redirects, etc.
     *
     * @param RequestInterface $request
     * @param array|null       $arguments
     *
     * @return mixed
     */
    public function before(RequestInterface $request, $arguments = null)
    {
        //

        $key = getenv("TOKEN_SECRET");
        $header = $request->getServer("HTTP_AUTHORIZATION");

        if(!$header) return Services::response()->setJSON(['message' => "Token Required"])->setStatusCode(ResponseInterface::HTTP_UNAUTHORIZED);

        $token = explode(" ", $header)[1];

        try{
            JWT::decode($token, new Key($key, 'HS256'));
        }catch(\Throwable $th){
            return Services::response()->setJSON(['message' => "Invalid Token"])->setStatusCode(ResponseInterface::HTTP_UNAUTHORIZED);
        }

        $decoded = JWT::decode($token, new Key($key, 'HS256'));
        $request->id_requester = $decoded->uid;
        $request->permission_level = $decoded->permission_level;
        $request->public_key = $decoded->public_key;
    }

    /**
     * Allows After filters to inspect and modify the response
     * object as needed. This method does not allow any way
     * to stop execution of other after filters, short of
     * throwing an Exception or Error.
     *
     * @param RequestInterface  $request
     * @param ResponseInterface $response
     * @param array|null        $arguments
     *
     * @return mixed
     */
    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
        //

        $key = getenv("TOKEN_SECRET");
        $header = $request->getServer("HTTP_AUTHORIZATION");
        $token = explode(" ", $header)[1];
        $decoded = JWT::decode($token, new Key($key, 'HS256'));

        // if($response->data_perizinan->uuid_pasien !== $decoded->uid) return Services::response()->setJSON(['message' => "You are not authorized to use this method"])->setStatusCode(ResponseInterface::HTTP_UNAUTHORIZED);
        // $data = $response->getJson();

        $controllerName = $request->uri->getSegment(1);
        $methodName = $request->uri->getSegment(2);
        
        if(strcmp($controllerName, "perizinan") == 0 && $methodName){
            $data = json_decode($response->getBody());
            if($data && property_exists($data, 'data_perizinan') && $data->data_perizinan->uuid_pasien != $decoded->uid) return Services::response()->setJSON(['message' => "You are not authorized to use this method"])->setStatusCode(ResponseInterface::HTTP_UNAUTHORIZED);
        }else if(strcmp($controllerName, "rekammedis" && $request->uri->getSegment(2) == "list" ) == 0){
            if(strcmp($decoded->roles, "pasien") == 0 && $request->uri->getSegment(3) != $decoded->uid) return Services::response()->setJSON(['message' => "You are not authorized to use this method"])->setStatusCode(ResponseInterface::HTTP_UNAUTHORIZED);
        }
    }
}
