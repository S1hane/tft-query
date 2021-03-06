// Bring in ApiKey
require('dotenv').config();
// Bring in all the path handlers
const LeagueRoutes = require('../path-handler/leagues.js');
const MatchRoutes = require('../path-handler/matches.js');
const SummonerRoutes = require('../path-handler/summoners.js');
// Bring in request client
const Request = require('../request-client/index.js');
// Bring in redis cache
const Redis = require('../cache/redis.js');

class TftQuery {
    constructor(config) {
        const { region, payload, apiKey, useRedis, redisConfig } = config;
        // Set up redis client
        this.redis = false;
        if (useRedis) {
            this.redis = new Redis(redisConfig || false);
        }
        
        this.region = region;
        this.payload = payload || {};
        this.apiKey = apiKey || process.env.API_KEY;
        this.temp = {};
    }

    // Utility methods
    updatePayload(obj) {
        const { payload } = this;
        const newPayload = { ...payload, ...obj };
        this.payload = newPayload;
    }

    enableRedis(options = false) {
        this.redis = new Redis(options);
    }

    async clearRedis() {
        try {
            if (this.redis) {
                await this.redis.flush();
                return 'OK'
            } else {
                throw new Error('Redis is not enabled. please enable in the constructor or use the method: enableRedis(<Object>:options)');
            }
        } catch(err) {
            throw new Error(err);
        }
    }

    // Summoner Paths
    async getSummonerBySummonerName() {
        try {
            // Pull out required config data
            const { region, payload, apiKey, redis } = this;
            const { summonerName } = payload;
            const config = { region, payload, apiKey };
            
            // Make sure the requested data exists.
            if (!summonerName) {
                throw new Error('The request getSummonerBySummonerName requires: <String> summonerName, in the payload.');
            }   

            // First check if redis has already cached the data.
            const key = `summoner-summonerByName-${summonerName}`;
            if (redis) {
                const data = await redis.get(key);
                if (data) {
                    return data;
                }
            }

            // If redis doesnt have it fetch and store the data.
            const pathHandler = new SummonerRoutes(config);
            const path = pathHandler.bySummonerName();
            
            const request = new Request(path);
            const data = await request.createRequest();
            
            // Store data and then return, awaiting the set may slow this down a bit going to look into refactoring.
            if (redis) {
                await redis.set(key, data);
            }
            return data;
                
        } catch(err) {
            throw new Error(err);
        }
    }

    async getSummonerByAccountId() {
        try {
            // Pull out required config data
            const { region, payload, apiKey, redis } = this;
            const { accountId } = payload;
            const config = { region, payload, apiKey };
            
            // Make sure the requested data exists.
            if (!accountId) {
                throw new Error('The request getSummonerByAccountId requires: <String> accountId, in the payload.');
            }   

            // First check if redis has already cached the data.
            const key = `summoner-summonerByAccoutId-${accountId}`;
            if (redis) {
                const data = await redis.get(key);
                if (data) {
                    return data;
                }
            }

            // If redis doesnt have it fetch and store the data.
            const pathHandler = new SummonerRoutes(config);
            const path = pathHandler.byAccountId();
            
            const request = new Request(path);
            const data = await request.createRequest();
            
            // Store data and then return, awaiting the set may slow this down a bit going to look into refactoring.
            if (redis) {
                await redis.set(key, data);
            }
            return data;
                
        } catch(err) {
            throw new Error(err);
        }
    }

    async getSummonerByPuuid() {
        try {
            // Pull out required config data
            const { region, payload, apiKey, redis } = this;
            const { puuid } = payload;
            const config = { region, payload, apiKey };
            
            // Make sure the requested data exists.
            if (!puuid) {
                throw new Error('The request getSummonerByPuuid requires: <String> puuid, in the payload.');
            }   

            // First check if redis has already cached the data.
            const key = `summoner-summonerByPuuid-${puuid}`;
            if (redis) {
                const data = await redis.get(key);
                if (data) {
                    return data;
                }
            }

            // If redis doesnt have it fetch and store the data.
            const pathHandler = new SummonerRoutes(config);
            const path = pathHandler.byPuuid();
            
            const request = new Request(path);
            const data = await request.createRequest();
            
            // Store data and then return, awaiting the set may slow this down a bit going to look into refactoring.
            if (redis) {
                await redis.set(key, data);
            }
            return data;
                
        } catch(err) {
            throw new Error(err);
        }
    }

    async getSummonerBySummonerId() {
        try {
            // Pull out required config data
            const { region, payload, apiKey, redis } = this;
            const { summonerId } = payload;
            const config = { region, payload, apiKey };
            
            // Make sure the requested data exists.
            if (!summonerId) {
                throw new Error('The request getSummonerBySummonerId requires: <String> summonerId, in the payload.');
            }   

            // First check if redis has already cached the data.
            const key = `summoner-summonerBySummonerId-${summonerId}`;
            if (redis) {
                const data = await redis.get(key);
                if (data) {
                    return data;
                }
            }

            // If redis doesnt have it fetch and store the data.
            const pathHandler = new SummonerRoutes(config);
            const path = pathHandler.bySummonerId();
            
            const request = new Request(path);
            const data = await request.createRequest();
            
            // Store data and then return, awaiting the set may slow this down a bit going to look into refactoring.
            if (redis) {
                await redis.set(key, data);
            }
            return data;
                
        } catch(err) {
            throw new Error(err);
        }
    }

    // Match routes
    async getMatchByPuuidAndCount() {
        try {
            // Pull out required config data
            const { region, payload, apiKey, redis } = this;
            const { puuid } = payload;
            const config = { region, payload, apiKey };
            
            // Make sure the requested data exists.
            if (!puuid) {
                throw new Error('The request getMatchByPuuidAndCount requires: <String> puuid, and an optional: <Integer> count in the payload.');
            }   

            // First check if redis has already cached the data.
            const key = `match-matchByPuuid-${puuid}`;
            if (redis) {
                const data = await redis.get(key);
                if (data) {
                    return data;
                }
            }

            // If redis doesnt have it fetch and store the data.
            const pathHandler = new MatchRoutes(config);
            const path = pathHandler.byPuuidAndCount();
            
            const request = new Request(path);
            const data = await request.createRequest();
            
            // Store data and then return, awaiting the set may slow this down a bit going to look into refactoring.
            if (redis) {
                await redis.set(key, data);
            }
            return data;
                
        } catch(err) {
            throw new Error(err);
        }
    }

    async getMatchByMatchId() {
        try {
            // Pull out required config data
            const { region, payload, apiKey, redis } = this;
            const { matchId } = payload;
            const config = { region, payload, apiKey };
            
            // Make sure the requested data exists.
            if (!matchId) {
                throw new Error('The request getMatchByMatchId requires: <String> matchId, in the payload.');
            }   

            // First check if redis has already cached the data.
            const key = `match-matchByMatchId-${matchId}`;
            if (redis) {
                const data = await redis.get(key);
                if (data) {
                    return data;
                }
            }

            // If redis doesnt have it fetch and store the data.
            const pathHandler = new MatchRoutes(config);
            const path = pathHandler.byMatchId();
            
            const request = new Request(path);
            const data = await request.createRequest();
            
            // Store data and then return, awaiting the set may slow this down a bit going to look into refactoring.
            if (redis) {
                await redis.set(key, data);
            }
            return data;
                
        } catch(err) {
            throw new Error(err);
        }
    }

    // League routes
    async getChallengerLeague() {
        try {
            // Pull out required config data
            const { region, payload, apiKey, redis } = this;
            const config = { region, payload, apiKey };

            // First check if redis has already cached the data.
            const key = `league-challenger`;
            if (redis) {
                const data = await redis.get(key);
                if (data) {
                    return data;
                }
            }

            // If redis doesnt have it fetch and store the data.
            const pathHandler = new LeagueRoutes(config);
            const path = pathHandler.challenger();
            
            const request = new Request(path);
            const data = await request.createRequest();
            
            // Store data and then return, awaiting the set may slow this down a bit going to look into refactoring.
            if (redis) {
                await redis.set(key, data);
            }
            return data;
                
        } catch(err) {
            throw new Error(err);
        }
    }

    async getMasterLeague() {
        try {
            // Pull out required config data
            const { region, payload, apiKey, redis } = this;
            const config = { region, payload, apiKey };

            // First check if redis has already cached the data.
            const key = `league-master`;
            if (redis) {
                const data = await redis.get(key);
                if (data) {
                    return data;
                }
            }

            // If redis doesnt have it fetch and store the data.
            const pathHandler = new LeagueRoutes(config);
            const path = pathHandler.master();
            
            const request = new Request(path);
            const data = await request.createRequest();
            
            // Store data and then return, awaiting the set may slow this down a bit going to look into refactoring.
            if (redis) {
                await redis.set(key, data);
            }
            return data;
                
        } catch(err) {
            throw new Error(err);
        }
    }

    async getGrandMasterLeague() {
        try {
            // Pull out required config data
            const { region, payload, apiKey, redis } = this;
            const config = { region, payload, apiKey };

            // First check if redis has already cached the data.
            const key = `league-GrandMaster`;
            if (redis) {
                const data = await redis.get(key);
                if (data) {
                    return data;
                }
            }

            // If redis doesnt have it fetch and store the data.
            const pathHandler = new LeagueRoutes(config);
            const path = pathHandler.grandmaster();
            
            const request = new Request(path);
            const data = await request.createRequest();
            
            // Store data and then return, awaiting the set may slow this down a bit going to look into refactoring.
            if (redis) {
                await redis.set(key, data);
            }
            return data;
                
        } catch(err) {
            throw new Error(err);
        }
    }

    async getLeagueBySummonerId() {
        try {
            // Pull out required config data
            const { region, payload, apiKey, redis } = this;
            const { summonerId } = payload;
            const config = { region, payload, apiKey };
            
            // Make sure the requested data exists.
            if (!summonerId) {
                throw new Error('The request getLeagueBySummonerId requires: <String> summonerId, in the payload.');
            }   

            // First check if redis has already cached the data.
            const key = `league-bySummonerId-${summonerId}`;
            if (redis) {
                const data = await redis.get(key);
                if (data) {
                    return data;
                }
            }

            // If redis doesnt have it fetch and store the data.
            const pathHandler = new LeagueRoutes(config);
            const path = pathHandler.bySummonerId();
            
            const request = new Request(path);
            const data = await request.createRequest();
            
            // Store data and then return, awaiting the set may slow this down a bit going to look into refactoring.
            if (redis) {
                await redis.set(key, data);
            }
            return data;
                
        } catch(err) {
            throw new Error(err);
        }
    }

    async getLeagueByLeagueId() {
        try {
            // Pull out required config data
            const { region, payload, apiKey, redis } = this;
            const { leagueId } = payload;
            const config = { region, payload, apiKey };
            
            // Make sure the requested data exists.
            if (!leagueId) {
                throw new Error('The request getLeagueByLeagueId requires: <String> leagueId, in the payload.');
            }   

            // First check if redis has already cached the data.
            const key = `league-byleagueId-${leagueId}`;
            if (redis) {
                const data = await redis.get(key);
                if (data) {
                    return data;
                }
            }

            // If redis doesnt have it fetch and store the data.
            const pathHandler = new LeagueRoutes(config);
            const path = pathHandler.byLeagueId();
            
            const request = new Request(path);
            const data = await request.createRequest();
            
            // Store data and then return, awaiting the set may slow this down a bit going to look into refactoring.
            if (redis) {
                await redis.set(key, data);
            }
            return data;
                
        } catch(err) {
            throw new Error(err);
        }
    }

    async getLeagueByTierAndDivision() {
        try {
            // Pull out required config data
            const { region, payload, apiKey, redis } = this;
            const { tier, division } = payload;
            const config = { region, payload, apiKey };
            
            // Make sure the requested data exists.
            if (!tier || !division) {
                throw new Error('The request getLeagueByTierAndDivision requires: <String> tier, and <String> division, in the payload.');
            }   

            // First check if redis has already cached the data.
            const key = `league-byTierAndDivision-${tier}-${division}`;
            if (redis) {
                const data = await redis.get(key);
                if (data) {
                    return data;
                }
            }

            // If redis doesnt have it fetch and store the data.
            const pathHandler = new LeagueRoutes(config);
            const path = pathHandler.byLeagueId();
            
            const request = new Request(path);
            const data = await request.createRequest();
            
            // Store data and then return, awaiting the set may slow this down a bit going to look into refactoring.
            if (redis) {
                await redis.set(key, data);
            }
            return data;
                
        } catch(err) {
            throw new Error(err);
        }
    }

    /* Batch / Special methods
     * These methods are under development and may not be fully optimized
     */

    async getBatchOfMatchInfo() {
        try {
            const { payload } = this;
            const { matchIds, matchId } = payload;
            // Edge handler: Store current matchId if it exists so it isnt rewritten
            const temp = matchId ? matchId : null;

            if (!matchIds) {
                throw new Error('The request getBatchOfMatchInfo requires: <Array>:<String> matchIds, in the payload of valid matchId\'s');
            }

            let matchInfo = {};
            for (let i = 0; i < matchIds.length; i++) {
                this.payload.matchId = matchIds[i];
                const matchData = await this.getMatchByMatchId();
                const singleMatch = {};
                const key = `game${i}`
                singleMatch[key] = matchData;
                matchInfo = { ...matchInfo, ...singleMatch };
            }
            this.payload.matchId = temp;
            return matchInfo;
        } catch(err) {
            throw new Error(err);
        }
    }
    // This method returns all summoner data + 20 most recent matches.
    async getAllInfoBySummonerName() {
        try {
            let temp = {};
            // First get basic summoner data by summoner name, update temp
            const summonerInfoByName = await this.getSummonerBySummonerName();
            temp = { ...temp, ...summonerInfoByName };

            // Then get that summoners league info by id
            this.payload.summonerId = temp.id;
            let summonerLeagueInfoById = await this.getLeagueBySummonerId();
            summonerLeagueInfoById = summonerLeagueInfoById[0];
            temp = { ...temp, ...summonerLeagueInfoById };

            // Then get the summoners last 20 match id's
            this.payload.puuid = temp.puuid;
            const TwentyMatchIds = await this.getMatchByPuuidAndCount();
            temp = { ...temp, matchIds: TwentyMatchIds };

            // Finally, get the match data for the last 20 matchs
            this.payload.matchIds = temp.matchIds;
            const lastTwentyMatchs = await this.getBatchOfMatchInfo();
            temp = { ...temp, allMatchInfo: lastTwentyMatchs }

            // Return data
            return temp;

        } catch(err) {
            throw new Error(err);
        }
    }
}

module.exports = TftQuery;
