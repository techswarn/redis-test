<?php

require '../vendor/autoload.php';

// Load the .env file if available
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/..');
$dotenv->safeLoad();

/**
 * Connect to redis using the REDIS_URL environment variable
 */
$config = parse_url($_ENV['REDIS_URL']);
$redis = new Redis();
$redis->connect(
    host: 'tls://' . $config['host'],
    port: $config['port'],
);

if (! empty($config['pass'])) {
    $redis->auth($config['pass']);
}

/**
 * Increment a key to prove the connection works
 */
$redis->incr('counter');

echo $redis->get('counter');