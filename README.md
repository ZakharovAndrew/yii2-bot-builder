# Yii2 Bot Builder

[![Latest Stable Version](https://poser.pugx.org/zakharov-andrew/yii2-bot-builder/v/stable)](https://packagist.org/packages/zakharov-andrew/yii2-bot-builder)
[![License](https://poser.pugx.org/zakharov-andrew/yii2-bot-builder/license)](https://packagist.org/packages/zakharov-andrew/yii2-bot-builder)
[![Yii2](https://img.shields.io/badge/Powered_by-Yii_Framework-green.svg?style=flat)](http://www.yiiframework.com/)

Yii2 Bot Builder. Module for creating a diagram of chat bots

## Installation

The preferred way to install this extension is through [composer](http://getcomposer.org/download/).

Either run

```
$ composer require zakharov-andrew/yii2-bot-builder
```
or add

```
"zakharov-andrew/yii2-bot-builder": "*"
```

to the ```require``` section of your ```composer.json``` file.

Subsequently, run

```
./yii migrate/up --migrationPath=@vendor/zakharov-andrew/yii2-bot-builder/migrations
```

in order to create the settings table in your database.

Or add to console config

```php
return [
    // ...
    'controllerMap' => [
        // ...
        'migrate' => [
            'class' => 'yii\console\controllers\MigrateController',
            'migrationPath' => [
                '@console/migrations', // Default migration folder
                '@vendor/zakharov-andrew/yii2-bot-builder/src/migrations'
            ]
        ]
        // ...
    ]
    // ...
];
```

## Usage

Add this to your main configuration's modules array

```
    'modules' => [
        'BotBuilder' => [
            'class' => 'ZakharovAndrew\BotBuilder\Module',
            'bootstrapVersion' => 5, // if use bootstrap 5
        ],
        // ...
    ],
```

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

**yii2-bot-builder** it is available under a MIT License. Detailed information can be found in the `LICENSE.md`. 
