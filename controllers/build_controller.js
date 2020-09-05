const simpleGit = require('simple-git');
const shell = require('shelljs');
const fs = require('fs');
const log = require('../modules/log');


const git = simpleGit({ baseDir: '/workdir' });



exports.build = function(req, res) {
  log.debug(req);
  log.debug("====================================================================================================");
  log.debug(req.body);
  try{
    const repository = req.body.repository;
    fs.access(`/workdir/${repository.name}/`, function(error) {
      if (error) {
        console.log(`Cloning ${repository.clone_url}`);
        git.clone(repository.clone_url)
          .then(() => console.log('finished cloning'))
          .catch((err) => console.error('failed cloning: ', err));
      }
      else {
        console.log(`${repository.name} already exists, getting latest`);
        shell.cd(`/workdir/${repository.name}`);
        console.log( shell.ls() );
        shell.exec('git pull')
        // git.pull( (err, update) => {
        //   if ( err ){
        //     console.log(`Error pulling ${repository.name}: ${err}`);
        //     res.status(500).json({success: false, message: err });
        //   }
        // });
      }
    });

    shell.cd(`/workdir/${repository.name}`)
    shell.exec('img build -t p80n/build-buddy-js:foo .', function(code, stdout, stderr){
      if ( code != 0 ){
        res.status(500).json({success: false, message: stderr });
      }
      else {
        res.status(200).json({success: true});
      }

    });


  }
  catch(err)
  {
    console.log(err);
  }

};
