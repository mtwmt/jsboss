/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "9d5f6137b014692329d8";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "newtab";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "9d5f6137b014692329d8";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "newtab";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: [],
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = ".";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./newtab/index.js")(__webpack_require__.s = "./newtab/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/lib/index.js?!./newtab/App.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************!*\
  !*** ../node_modules/babel-loader/lib!../node_modules/vue-loader/lib??vue-loader-options!./newtab/App.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n//\n//\n//\n//\n//\n//\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  data() {\n    return {\n      msg: 'Welcome!'\n    };\n  }\n\n});\n\n//# sourceURL=webpack:///./newtab/App.vue?../node_modules/babel-loader/lib!../node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "../node_modules/process/browser.js":
/*!******************************************!*\
  !*** ../node_modules/process/browser.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// shim for using process in browser\nvar process = module.exports = {};\n\n// cached from whatever global is present so that test runners that stub it\n// don't break things.  But we need to wrap it in a try catch in case it is\n// wrapped in strict mode code which doesn't define any globals.  It's inside a\n// function because try/catches deoptimize in certain engines.\n\nvar cachedSetTimeout;\nvar cachedClearTimeout;\n\nfunction defaultSetTimout() {\n    throw new Error('setTimeout has not been defined');\n}\nfunction defaultClearTimeout () {\n    throw new Error('clearTimeout has not been defined');\n}\n(function () {\n    try {\n        if (typeof setTimeout === 'function') {\n            cachedSetTimeout = setTimeout;\n        } else {\n            cachedSetTimeout = defaultSetTimout;\n        }\n    } catch (e) {\n        cachedSetTimeout = defaultSetTimout;\n    }\n    try {\n        if (typeof clearTimeout === 'function') {\n            cachedClearTimeout = clearTimeout;\n        } else {\n            cachedClearTimeout = defaultClearTimeout;\n        }\n    } catch (e) {\n        cachedClearTimeout = defaultClearTimeout;\n    }\n} ())\nfunction runTimeout(fun) {\n    if (cachedSetTimeout === setTimeout) {\n        //normal enviroments in sane situations\n        return setTimeout(fun, 0);\n    }\n    // if setTimeout wasn't available but was latter defined\n    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {\n        cachedSetTimeout = setTimeout;\n        return setTimeout(fun, 0);\n    }\n    try {\n        // when when somebody has screwed with setTimeout but no I.E. maddness\n        return cachedSetTimeout(fun, 0);\n    } catch(e){\n        try {\n            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally\n            return cachedSetTimeout.call(null, fun, 0);\n        } catch(e){\n            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error\n            return cachedSetTimeout.call(this, fun, 0);\n        }\n    }\n\n\n}\nfunction runClearTimeout(marker) {\n    if (cachedClearTimeout === clearTimeout) {\n        //normal enviroments in sane situations\n        return clearTimeout(marker);\n    }\n    // if clearTimeout wasn't available but was latter defined\n    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {\n        cachedClearTimeout = clearTimeout;\n        return clearTimeout(marker);\n    }\n    try {\n        // when when somebody has screwed with setTimeout but no I.E. maddness\n        return cachedClearTimeout(marker);\n    } catch (e){\n        try {\n            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally\n            return cachedClearTimeout.call(null, marker);\n        } catch (e){\n            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.\n            // Some versions of I.E. have different rules for clearTimeout vs setTimeout\n            return cachedClearTimeout.call(this, marker);\n        }\n    }\n\n\n\n}\nvar queue = [];\nvar draining = false;\nvar currentQueue;\nvar queueIndex = -1;\n\nfunction cleanUpNextTick() {\n    if (!draining || !currentQueue) {\n        return;\n    }\n    draining = false;\n    if (currentQueue.length) {\n        queue = currentQueue.concat(queue);\n    } else {\n        queueIndex = -1;\n    }\n    if (queue.length) {\n        drainQueue();\n    }\n}\n\nfunction drainQueue() {\n    if (draining) {\n        return;\n    }\n    var timeout = runTimeout(cleanUpNextTick);\n    draining = true;\n\n    var len = queue.length;\n    while(len) {\n        currentQueue = queue;\n        queue = [];\n        while (++queueIndex < len) {\n            if (currentQueue) {\n                currentQueue[queueIndex].run();\n            }\n        }\n        queueIndex = -1;\n        len = queue.length;\n    }\n    currentQueue = null;\n    draining = false;\n    runClearTimeout(timeout);\n}\n\nprocess.nextTick = function (fun) {\n    var args = new Array(arguments.length - 1);\n    if (arguments.length > 1) {\n        for (var i = 1; i < arguments.length; i++) {\n            args[i - 1] = arguments[i];\n        }\n    }\n    queue.push(new Item(fun, args));\n    if (queue.length === 1 && !draining) {\n        runTimeout(drainQueue);\n    }\n};\n\n// v8 likes predictible objects\nfunction Item(fun, array) {\n    this.fun = fun;\n    this.array = array;\n}\nItem.prototype.run = function () {\n    this.fun.apply(null, this.array);\n};\nprocess.title = 'browser';\nprocess.browser = true;\nprocess.env = {};\nprocess.argv = [];\nprocess.version = ''; // empty string to avoid regexp issues\nprocess.versions = {};\n\nfunction noop() {}\n\nprocess.on = noop;\nprocess.addListener = noop;\nprocess.once = noop;\nprocess.off = noop;\nprocess.removeListener = noop;\nprocess.removeAllListeners = noop;\nprocess.emit = noop;\nprocess.prependListener = noop;\nprocess.prependOnceListener = noop;\n\nprocess.listeners = function (name) { return [] }\n\nprocess.binding = function (name) {\n    throw new Error('process.binding is not supported');\n};\n\nprocess.cwd = function () { return '/' };\nprocess.chdir = function (dir) {\n    throw new Error('process.chdir is not supported');\n};\nprocess.umask = function() { return 0; };\n\n\n//# sourceURL=webpack:///../node_modules/process/browser.js?");

/***/ }),

/***/ "../node_modules/setimmediate/setImmediate.js":
/*!****************************************************!*\
  !*** ../node_modules/setimmediate/setImmediate.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {\n    \"use strict\";\n\n    if (global.setImmediate) {\n        return;\n    }\n\n    var nextHandle = 1; // Spec says greater than zero\n    var tasksByHandle = {};\n    var currentlyRunningATask = false;\n    var doc = global.document;\n    var registerImmediate;\n\n    function setImmediate(callback) {\n      // Callback can either be a function or a string\n      if (typeof callback !== \"function\") {\n        callback = new Function(\"\" + callback);\n      }\n      // Copy function arguments\n      var args = new Array(arguments.length - 1);\n      for (var i = 0; i < args.length; i++) {\n          args[i] = arguments[i + 1];\n      }\n      // Store and register the task\n      var task = { callback: callback, args: args };\n      tasksByHandle[nextHandle] = task;\n      registerImmediate(nextHandle);\n      return nextHandle++;\n    }\n\n    function clearImmediate(handle) {\n        delete tasksByHandle[handle];\n    }\n\n    function run(task) {\n        var callback = task.callback;\n        var args = task.args;\n        switch (args.length) {\n        case 0:\n            callback();\n            break;\n        case 1:\n            callback(args[0]);\n            break;\n        case 2:\n            callback(args[0], args[1]);\n            break;\n        case 3:\n            callback(args[0], args[1], args[2]);\n            break;\n        default:\n            callback.apply(undefined, args);\n            break;\n        }\n    }\n\n    function runIfPresent(handle) {\n        // From the spec: \"Wait until any invocations of this algorithm started before this one have completed.\"\n        // So if we're currently running a task, we'll need to delay this invocation.\n        if (currentlyRunningATask) {\n            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a\n            // \"too much recursion\" error.\n            setTimeout(runIfPresent, 0, handle);\n        } else {\n            var task = tasksByHandle[handle];\n            if (task) {\n                currentlyRunningATask = true;\n                try {\n                    run(task);\n                } finally {\n                    clearImmediate(handle);\n                    currentlyRunningATask = false;\n                }\n            }\n        }\n    }\n\n    function installNextTickImplementation() {\n        registerImmediate = function(handle) {\n            process.nextTick(function () { runIfPresent(handle); });\n        };\n    }\n\n    function canUsePostMessage() {\n        // The test against `importScripts` prevents this implementation from being installed inside a web worker,\n        // where `global.postMessage` means something completely different and can't be used for this purpose.\n        if (global.postMessage && !global.importScripts) {\n            var postMessageIsAsynchronous = true;\n            var oldOnMessage = global.onmessage;\n            global.onmessage = function() {\n                postMessageIsAsynchronous = false;\n            };\n            global.postMessage(\"\", \"*\");\n            global.onmessage = oldOnMessage;\n            return postMessageIsAsynchronous;\n        }\n    }\n\n    function installPostMessageImplementation() {\n        // Installs an event handler on `global` for the `message` event: see\n        // * https://developer.mozilla.org/en/DOM/window.postMessage\n        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages\n\n        var messagePrefix = \"setImmediate$\" + Math.random() + \"$\";\n        var onGlobalMessage = function(event) {\n            if (event.source === global &&\n                typeof event.data === \"string\" &&\n                event.data.indexOf(messagePrefix) === 0) {\n                runIfPresent(+event.data.slice(messagePrefix.length));\n            }\n        };\n\n        if (global.addEventListener) {\n            global.addEventListener(\"message\", onGlobalMessage, false);\n        } else {\n            global.attachEvent(\"onmessage\", onGlobalMessage);\n        }\n\n        registerImmediate = function(handle) {\n            global.postMessage(messagePrefix + handle, \"*\");\n        };\n    }\n\n    function installMessageChannelImplementation() {\n        var channel = new MessageChannel();\n        channel.port1.onmessage = function(event) {\n            var handle = event.data;\n            runIfPresent(handle);\n        };\n\n        registerImmediate = function(handle) {\n            channel.port2.postMessage(handle);\n        };\n    }\n\n    function installReadyStateChangeImplementation() {\n        var html = doc.documentElement;\n        registerImmediate = function(handle) {\n            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted\n            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.\n            var script = doc.createElement(\"script\");\n            script.onreadystatechange = function () {\n                runIfPresent(handle);\n                script.onreadystatechange = null;\n                html.removeChild(script);\n                script = null;\n            };\n            html.appendChild(script);\n        };\n    }\n\n    function installSetTimeoutImplementation() {\n        registerImmediate = function(handle) {\n            setTimeout(runIfPresent, 0, handle);\n        };\n    }\n\n    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.\n    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);\n    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;\n\n    // Don't get fooled by e.g. browserify environments.\n    if ({}.toString.call(global.process) === \"[object process]\") {\n        // For Node.js before 0.9\n        installNextTickImplementation();\n\n    } else if (canUsePostMessage()) {\n        // For non-IE10 modern browsers\n        installPostMessageImplementation();\n\n    } else if (global.MessageChannel) {\n        // For web workers, where supported\n        installMessageChannelImplementation();\n\n    } else if (doc && \"onreadystatechange\" in doc.createElement(\"script\")) {\n        // For IE 6–8\n        installReadyStateChangeImplementation();\n\n    } else {\n        // For older browsers\n        installSetTimeoutImplementation();\n    }\n\n    attachTo.setImmediate = setImmediate;\n    attachTo.clearImmediate = clearImmediate;\n}(typeof self === \"undefined\" ? typeof global === \"undefined\" ? this : global : self));\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ \"../node_modules/webpack/buildin/global.js\"), __webpack_require__(/*! ./../process/browser.js */ \"../node_modules/process/browser.js\")))\n\n//# sourceURL=webpack:///../node_modules/setimmediate/setImmediate.js?");

/***/ }),

/***/ "../node_modules/timers-browserify/main.js":
/*!*************************************************!*\
  !*** ../node_modules/timers-browserify/main.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== \"undefined\" && global) ||\n            (typeof self !== \"undefined\" && self) ||\n            window;\nvar apply = Function.prototype.apply;\n\n// DOM APIs, for completeness\n\nexports.setTimeout = function() {\n  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);\n};\nexports.setInterval = function() {\n  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);\n};\nexports.clearTimeout =\nexports.clearInterval = function(timeout) {\n  if (timeout) {\n    timeout.close();\n  }\n};\n\nfunction Timeout(id, clearFn) {\n  this._id = id;\n  this._clearFn = clearFn;\n}\nTimeout.prototype.unref = Timeout.prototype.ref = function() {};\nTimeout.prototype.close = function() {\n  this._clearFn.call(scope, this._id);\n};\n\n// Does not start the time, just sets up the members needed.\nexports.enroll = function(item, msecs) {\n  clearTimeout(item._idleTimeoutId);\n  item._idleTimeout = msecs;\n};\n\nexports.unenroll = function(item) {\n  clearTimeout(item._idleTimeoutId);\n  item._idleTimeout = -1;\n};\n\nexports._unrefActive = exports.active = function(item) {\n  clearTimeout(item._idleTimeoutId);\n\n  var msecs = item._idleTimeout;\n  if (msecs >= 0) {\n    item._idleTimeoutId = setTimeout(function onTimeout() {\n      if (item._onTimeout)\n        item._onTimeout();\n    }, msecs);\n  }\n};\n\n// setimmediate attaches itself to the global object\n__webpack_require__(/*! setimmediate */ \"../node_modules/setimmediate/setImmediate.js\");\n// On some exotic environments, it's not clear which object `setimmediate` was\n// able to install onto.  Search each possibility in the same order as the\n// `setimmediate` library.\nexports.setImmediate = (typeof self !== \"undefined\" && self.setImmediate) ||\n                       (typeof global !== \"undefined\" && global.setImmediate) ||\n                       (this && this.setImmediate);\nexports.clearImmediate = (typeof self !== \"undefined\" && self.clearImmediate) ||\n                         (typeof global !== \"undefined\" && global.clearImmediate) ||\n                         (this && this.clearImmediate);\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ \"../node_modules/webpack/buildin/global.js\")))\n\n//# sourceURL=webpack:///../node_modules/timers-browserify/main.js?");

/***/ }),

/***/ "../node_modules/vue-hot-reload-api/dist/index.js":
/*!********************************************************!*\
  !*** ../node_modules/vue-hot-reload-api/dist/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var Vue // late bind\nvar version\nvar map = Object.create(null)\nif (typeof window !== 'undefined') {\n  window.__VUE_HOT_MAP__ = map\n}\nvar installed = false\nvar isBrowserify = false\nvar initHookName = 'beforeCreate'\n\nexports.install = function (vue, browserify) {\n  if (installed) { return }\n  installed = true\n\n  Vue = vue.__esModule ? vue.default : vue\n  version = Vue.version.split('.').map(Number)\n  isBrowserify = browserify\n\n  // compat with < 2.0.0-alpha.7\n  if (Vue.config._lifecycleHooks.indexOf('init') > -1) {\n    initHookName = 'init'\n  }\n\n  exports.compatible = version[0] >= 2\n  if (!exports.compatible) {\n    console.warn(\n      '[HMR] You are using a version of vue-hot-reload-api that is ' +\n        'only compatible with Vue.js core ^2.0.0.'\n    )\n    return\n  }\n}\n\n/**\n * Create a record for a hot module, which keeps track of its constructor\n * and instances\n *\n * @param {String} id\n * @param {Object} options\n */\n\nexports.createRecord = function (id, options) {\n  if(map[id]) { return }\n\n  var Ctor = null\n  if (typeof options === 'function') {\n    Ctor = options\n    options = Ctor.options\n  }\n  makeOptionsHot(id, options)\n  map[id] = {\n    Ctor: Ctor,\n    options: options,\n    instances: []\n  }\n}\n\n/**\n * Check if module is recorded\n *\n * @param {String} id\n */\n\nexports.isRecorded = function (id) {\n  return typeof map[id] !== 'undefined'\n}\n\n/**\n * Make a Component options object hot.\n *\n * @param {String} id\n * @param {Object} options\n */\n\nfunction makeOptionsHot(id, options) {\n  if (options.functional) {\n    var render = options.render\n    options.render = function (h, ctx) {\n      var instances = map[id].instances\n      if (ctx && instances.indexOf(ctx.parent) < 0) {\n        instances.push(ctx.parent)\n      }\n      return render(h, ctx)\n    }\n  } else {\n    injectHook(options, initHookName, function() {\n      var record = map[id]\n      if (!record.Ctor) {\n        record.Ctor = this.constructor\n      }\n      record.instances.push(this)\n    })\n    injectHook(options, 'beforeDestroy', function() {\n      var instances = map[id].instances\n      instances.splice(instances.indexOf(this), 1)\n    })\n  }\n}\n\n/**\n * Inject a hook to a hot reloadable component so that\n * we can keep track of it.\n *\n * @param {Object} options\n * @param {String} name\n * @param {Function} hook\n */\n\nfunction injectHook(options, name, hook) {\n  var existing = options[name]\n  options[name] = existing\n    ? Array.isArray(existing) ? existing.concat(hook) : [existing, hook]\n    : [hook]\n}\n\nfunction tryWrap(fn) {\n  return function (id, arg) {\n    try {\n      fn(id, arg)\n    } catch (e) {\n      console.error(e)\n      console.warn(\n        'Something went wrong during Vue component hot-reload. Full reload required.'\n      )\n    }\n  }\n}\n\nfunction updateOptions (oldOptions, newOptions) {\n  for (var key in oldOptions) {\n    if (!(key in newOptions)) {\n      delete oldOptions[key]\n    }\n  }\n  for (var key$1 in newOptions) {\n    oldOptions[key$1] = newOptions[key$1]\n  }\n}\n\nexports.rerender = tryWrap(function (id, options) {\n  var record = map[id]\n  if (!options) {\n    record.instances.slice().forEach(function (instance) {\n      instance.$forceUpdate()\n    })\n    return\n  }\n  if (typeof options === 'function') {\n    options = options.options\n  }\n  if (record.Ctor) {\n    record.Ctor.options.render = options.render\n    record.Ctor.options.staticRenderFns = options.staticRenderFns\n    record.instances.slice().forEach(function (instance) {\n      instance.$options.render = options.render\n      instance.$options.staticRenderFns = options.staticRenderFns\n      // reset static trees\n      // pre 2.5, all static trees are cached together on the instance\n      if (instance._staticTrees) {\n        instance._staticTrees = []\n      }\n      // 2.5.0\n      if (Array.isArray(record.Ctor.options.cached)) {\n        record.Ctor.options.cached = []\n      }\n      // 2.5.3\n      if (Array.isArray(instance.$options.cached)) {\n        instance.$options.cached = []\n      }\n\n      // post 2.5.4: v-once trees are cached on instance._staticTrees.\n      // Pure static trees are cached on the staticRenderFns array\n      // (both already reset above)\n\n      // 2.6: temporarily mark rendered scoped slots as unstable so that\n      // child components can be forced to update\n      var restore = patchScopedSlots(instance)\n      instance.$forceUpdate()\n      instance.$nextTick(restore)\n    })\n  } else {\n    // functional or no instance created yet\n    record.options.render = options.render\n    record.options.staticRenderFns = options.staticRenderFns\n\n    // handle functional component re-render\n    if (record.options.functional) {\n      // rerender with full options\n      if (Object.keys(options).length > 2) {\n        updateOptions(record.options, options)\n      } else {\n        // template-only rerender.\n        // need to inject the style injection code for CSS modules\n        // to work properly.\n        var injectStyles = record.options._injectStyles\n        if (injectStyles) {\n          var render = options.render\n          record.options.render = function (h, ctx) {\n            injectStyles.call(ctx)\n            return render(h, ctx)\n          }\n        }\n      }\n      record.options._Ctor = null\n      // 2.5.3\n      if (Array.isArray(record.options.cached)) {\n        record.options.cached = []\n      }\n      record.instances.slice().forEach(function (instance) {\n        instance.$forceUpdate()\n      })\n    }\n  }\n})\n\nexports.reload = tryWrap(function (id, options) {\n  var record = map[id]\n  if (options) {\n    if (typeof options === 'function') {\n      options = options.options\n    }\n    makeOptionsHot(id, options)\n    if (record.Ctor) {\n      if (version[1] < 2) {\n        // preserve pre 2.2 behavior for global mixin handling\n        record.Ctor.extendOptions = options\n      }\n      var newCtor = record.Ctor.super.extend(options)\n      record.Ctor.options = newCtor.options\n      record.Ctor.cid = newCtor.cid\n      record.Ctor.prototype = newCtor.prototype\n      if (newCtor.release) {\n        // temporary global mixin strategy used in < 2.0.0-alpha.6\n        newCtor.release()\n      }\n    } else {\n      updateOptions(record.options, options)\n    }\n  }\n  record.instances.slice().forEach(function (instance) {\n    if (instance.$vnode && instance.$vnode.context) {\n      instance.$vnode.context.$forceUpdate()\n    } else {\n      console.warn(\n        'Root or manually mounted instance modified. Full reload required.'\n      )\n    }\n  })\n})\n\n// 2.6 optimizes template-compiled scoped slots and skips updates if child\n// only uses scoped slots. We need to patch the scoped slots resolving helper\n// to temporarily mark all scoped slots as unstable in order to force child\n// updates.\nfunction patchScopedSlots (instance) {\n  if (!instance._u) { return }\n  // https://github.com/vuejs/vue/blob/dev/src/core/instance/render-helpers/resolve-scoped-slots.js\n  var original = instance._u\n  instance._u = function (slots) {\n    try {\n      // 2.6.4 ~ 2.6.6\n      return original(slots, true)\n    } catch (e) {\n      // 2.5 / >= 2.6.7\n      return original(slots, null, true)\n    }\n  }\n  return function () {\n    instance._u = original\n  }\n}\n\n\n//# sourceURL=webpack:///../node_modules/vue-hot-reload-api/dist/index.js?");

/***/ }),

/***/ "../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!./newtab/App.vue?vue&type=template&id=b1d64916&":
/*!***************************************************************************************************************************************************************************************!*\
  !*** ../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/vue-loader/lib??vue-loader-options!./newtab/App.vue?vue&type=template&id=b1d64916& ***!
  \***************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\"div\", [_c(\"h1\", [_vm._v(_vm._s(_vm.msg))])])\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./newtab/App.vue?../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "../node_modules/vue-loader/lib/runtime/componentNormalizer.js":
/*!*********************************************************************!*\
  !*** ../node_modules/vue-loader/lib/runtime/componentNormalizer.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return normalizeComponent; });\n/* globals __VUE_SSR_CONTEXT__ */\n\n// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).\n// This module is a runtime utility for cleaner component module output and will\n// be included in the final webpack user bundle.\n\nfunction normalizeComponent (\n  scriptExports,\n  render,\n  staticRenderFns,\n  functionalTemplate,\n  injectStyles,\n  scopeId,\n  moduleIdentifier, /* server only */\n  shadowMode /* vue-cli only */\n) {\n  // Vue.extend constructor export interop\n  var options = typeof scriptExports === 'function'\n    ? scriptExports.options\n    : scriptExports\n\n  // render functions\n  if (render) {\n    options.render = render\n    options.staticRenderFns = staticRenderFns\n    options._compiled = true\n  }\n\n  // functional template\n  if (functionalTemplate) {\n    options.functional = true\n  }\n\n  // scopedId\n  if (scopeId) {\n    options._scopeId = 'data-v-' + scopeId\n  }\n\n  var hook\n  if (moduleIdentifier) { // server build\n    hook = function (context) {\n      // 2.3 injection\n      context =\n        context || // cached call\n        (this.$vnode && this.$vnode.ssrContext) || // stateful\n        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional\n      // 2.2 with runInNewContext: true\n      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {\n        context = __VUE_SSR_CONTEXT__\n      }\n      // inject component styles\n      if (injectStyles) {\n        injectStyles.call(this, context)\n      }\n      // register component module identifier for async chunk inferrence\n      if (context && context._registeredComponents) {\n        context._registeredComponents.add(moduleIdentifier)\n      }\n    }\n    // used by ssr in case component is cached and beforeCreate\n    // never gets called\n    options._ssrRegister = hook\n  } else if (injectStyles) {\n    hook = shadowMode\n      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }\n      : injectStyles\n  }\n\n  if (hook) {\n    if (options.functional) {\n      // for template-only hot-reload because in that case the render fn doesn't\n      // go through the normalizer\n      options._injectStyles = hook\n      // register for functioal component in vue file\n      var originalRender = options.render\n      options.render = function renderWithStyleInjection (h, context) {\n        hook.call(context)\n        return originalRender(h, context)\n      }\n    } else {\n      // inject component registration as beforeCreate hook\n      var existing = options.beforeCreate\n      options.beforeCreate = existing\n        ? [].concat(existing, hook)\n        : [hook]\n    }\n  }\n\n  return {\n    exports: scriptExports,\n    options: options\n  }\n}\n\n\n//# sourceURL=webpack:///../node_modules/vue-loader/lib/runtime/componentNormalizer.js?");

/***/ }),

/***/ "../node_modules/vue/dist/vue.runtime.esm.js":
/*!***************************************************!*\
  !*** ../node_modules/vue/dist/vue.runtime.esm.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(global, setImmediate) {/*!\n * Vue.js v2.6.10\n * (c) 2014-2019 Evan You\n * Released under the MIT License.\n */\n/*  */\n\nvar emptyObject = Object.freeze({});\n\n// These helpers produce better VM code in JS engines due to their\n// explicitness and function inlining.\nfunction isUndef (v) {\n  return v === undefined || v === null\n}\n\nfunction isDef (v) {\n  return v !== undefined && v !== null\n}\n\nfunction isTrue (v) {\n  return v === true\n}\n\nfunction isFalse (v) {\n  return v === false\n}\n\n/**\n * Check if value is primitive.\n */\nfunction isPrimitive (value) {\n  return (\n    typeof value === 'string' ||\n    typeof value === 'number' ||\n    // $flow-disable-line\n    typeof value === 'symbol' ||\n    typeof value === 'boolean'\n  )\n}\n\n/**\n * Quick object check - this is primarily used to tell\n * Objects from primitive values when we know the value\n * is a JSON-compliant type.\n */\nfunction isObject (obj) {\n  return obj !== null && typeof obj === 'object'\n}\n\n/**\n * Get the raw type string of a value, e.g., [object Object].\n */\nvar _toString = Object.prototype.toString;\n\nfunction toRawType (value) {\n  return _toString.call(value).slice(8, -1)\n}\n\n/**\n * Strict object type check. Only returns true\n * for plain JavaScript objects.\n */\nfunction isPlainObject (obj) {\n  return _toString.call(obj) === '[object Object]'\n}\n\nfunction isRegExp (v) {\n  return _toString.call(v) === '[object RegExp]'\n}\n\n/**\n * Check if val is a valid array index.\n */\nfunction isValidArrayIndex (val) {\n  var n = parseFloat(String(val));\n  return n >= 0 && Math.floor(n) === n && isFinite(val)\n}\n\nfunction isPromise (val) {\n  return (\n    isDef(val) &&\n    typeof val.then === 'function' &&\n    typeof val.catch === 'function'\n  )\n}\n\n/**\n * Convert a value to a string that is actually rendered.\n */\nfunction toString (val) {\n  return val == null\n    ? ''\n    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)\n      ? JSON.stringify(val, null, 2)\n      : String(val)\n}\n\n/**\n * Convert an input value to a number for persistence.\n * If the conversion fails, return original string.\n */\nfunction toNumber (val) {\n  var n = parseFloat(val);\n  return isNaN(n) ? val : n\n}\n\n/**\n * Make a map and return a function for checking if a key\n * is in that map.\n */\nfunction makeMap (\n  str,\n  expectsLowerCase\n) {\n  var map = Object.create(null);\n  var list = str.split(',');\n  for (var i = 0; i < list.length; i++) {\n    map[list[i]] = true;\n  }\n  return expectsLowerCase\n    ? function (val) { return map[val.toLowerCase()]; }\n    : function (val) { return map[val]; }\n}\n\n/**\n * Check if a tag is a built-in tag.\n */\nvar isBuiltInTag = makeMap('slot,component', true);\n\n/**\n * Check if an attribute is a reserved attribute.\n */\nvar isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');\n\n/**\n * Remove an item from an array.\n */\nfunction remove (arr, item) {\n  if (arr.length) {\n    var index = arr.indexOf(item);\n    if (index > -1) {\n      return arr.splice(index, 1)\n    }\n  }\n}\n\n/**\n * Check whether an object has the property.\n */\nvar hasOwnProperty = Object.prototype.hasOwnProperty;\nfunction hasOwn (obj, key) {\n  return hasOwnProperty.call(obj, key)\n}\n\n/**\n * Create a cached version of a pure function.\n */\nfunction cached (fn) {\n  var cache = Object.create(null);\n  return (function cachedFn (str) {\n    var hit = cache[str];\n    return hit || (cache[str] = fn(str))\n  })\n}\n\n/**\n * Camelize a hyphen-delimited string.\n */\nvar camelizeRE = /-(\\w)/g;\nvar camelize = cached(function (str) {\n  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })\n});\n\n/**\n * Capitalize a string.\n */\nvar capitalize = cached(function (str) {\n  return str.charAt(0).toUpperCase() + str.slice(1)\n});\n\n/**\n * Hyphenate a camelCase string.\n */\nvar hyphenateRE = /\\B([A-Z])/g;\nvar hyphenate = cached(function (str) {\n  return str.replace(hyphenateRE, '-$1').toLowerCase()\n});\n\n/**\n * Simple bind polyfill for environments that do not support it,\n * e.g., PhantomJS 1.x. Technically, we don't need this anymore\n * since native bind is now performant enough in most browsers.\n * But removing it would mean breaking code that was able to run in\n * PhantomJS 1.x, so this must be kept for backward compatibility.\n */\n\n/* istanbul ignore next */\nfunction polyfillBind (fn, ctx) {\n  function boundFn (a) {\n    var l = arguments.length;\n    return l\n      ? l > 1\n        ? fn.apply(ctx, arguments)\n        : fn.call(ctx, a)\n      : fn.call(ctx)\n  }\n\n  boundFn._length = fn.length;\n  return boundFn\n}\n\nfunction nativeBind (fn, ctx) {\n  return fn.bind(ctx)\n}\n\nvar bind = Function.prototype.bind\n  ? nativeBind\n  : polyfillBind;\n\n/**\n * Convert an Array-like object to a real Array.\n */\nfunction toArray (list, start) {\n  start = start || 0;\n  var i = list.length - start;\n  var ret = new Array(i);\n  while (i--) {\n    ret[i] = list[i + start];\n  }\n  return ret\n}\n\n/**\n * Mix properties into target object.\n */\nfunction extend (to, _from) {\n  for (var key in _from) {\n    to[key] = _from[key];\n  }\n  return to\n}\n\n/**\n * Merge an Array of Objects into a single Object.\n */\nfunction toObject (arr) {\n  var res = {};\n  for (var i = 0; i < arr.length; i++) {\n    if (arr[i]) {\n      extend(res, arr[i]);\n    }\n  }\n  return res\n}\n\n/* eslint-disable no-unused-vars */\n\n/**\n * Perform no operation.\n * Stubbing args to make Flow happy without leaving useless transpiled code\n * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).\n */\nfunction noop (a, b, c) {}\n\n/**\n * Always return false.\n */\nvar no = function (a, b, c) { return false; };\n\n/* eslint-enable no-unused-vars */\n\n/**\n * Return the same value.\n */\nvar identity = function (_) { return _; };\n\n/**\n * Check if two values are loosely equal - that is,\n * if they are plain objects, do they have the same shape?\n */\nfunction looseEqual (a, b) {\n  if (a === b) { return true }\n  var isObjectA = isObject(a);\n  var isObjectB = isObject(b);\n  if (isObjectA && isObjectB) {\n    try {\n      var isArrayA = Array.isArray(a);\n      var isArrayB = Array.isArray(b);\n      if (isArrayA && isArrayB) {\n        return a.length === b.length && a.every(function (e, i) {\n          return looseEqual(e, b[i])\n        })\n      } else if (a instanceof Date && b instanceof Date) {\n        return a.getTime() === b.getTime()\n      } else if (!isArrayA && !isArrayB) {\n        var keysA = Object.keys(a);\n        var keysB = Object.keys(b);\n        return keysA.length === keysB.length && keysA.every(function (key) {\n          return looseEqual(a[key], b[key])\n        })\n      } else {\n        /* istanbul ignore next */\n        return false\n      }\n    } catch (e) {\n      /* istanbul ignore next */\n      return false\n    }\n  } else if (!isObjectA && !isObjectB) {\n    return String(a) === String(b)\n  } else {\n    return false\n  }\n}\n\n/**\n * Return the first index at which a loosely equal value can be\n * found in the array (if value is a plain object, the array must\n * contain an object of the same shape), or -1 if it is not present.\n */\nfunction looseIndexOf (arr, val) {\n  for (var i = 0; i < arr.length; i++) {\n    if (looseEqual(arr[i], val)) { return i }\n  }\n  return -1\n}\n\n/**\n * Ensure a function is called only once.\n */\nfunction once (fn) {\n  var called = false;\n  return function () {\n    if (!called) {\n      called = true;\n      fn.apply(this, arguments);\n    }\n  }\n}\n\nvar SSR_ATTR = 'data-server-rendered';\n\nvar ASSET_TYPES = [\n  'component',\n  'directive',\n  'filter'\n];\n\nvar LIFECYCLE_HOOKS = [\n  'beforeCreate',\n  'created',\n  'beforeMount',\n  'mounted',\n  'beforeUpdate',\n  'updated',\n  'beforeDestroy',\n  'destroyed',\n  'activated',\n  'deactivated',\n  'errorCaptured',\n  'serverPrefetch'\n];\n\n/*  */\n\n\n\nvar config = ({\n  /**\n   * Option merge strategies (used in core/util/options)\n   */\n  // $flow-disable-line\n  optionMergeStrategies: Object.create(null),\n\n  /**\n   * Whether to suppress warnings.\n   */\n  silent: false,\n\n  /**\n   * Show production mode tip message on boot?\n   */\n  productionTip: \"development\" !== 'production',\n\n  /**\n   * Whether to enable devtools\n   */\n  devtools: \"development\" !== 'production',\n\n  /**\n   * Whether to record perf\n   */\n  performance: false,\n\n  /**\n   * Error handler for watcher errors\n   */\n  errorHandler: null,\n\n  /**\n   * Warn handler for watcher warns\n   */\n  warnHandler: null,\n\n  /**\n   * Ignore certain custom elements\n   */\n  ignoredElements: [],\n\n  /**\n   * Custom user key aliases for v-on\n   */\n  // $flow-disable-line\n  keyCodes: Object.create(null),\n\n  /**\n   * Check if a tag is reserved so that it cannot be registered as a\n   * component. This is platform-dependent and may be overwritten.\n   */\n  isReservedTag: no,\n\n  /**\n   * Check if an attribute is reserved so that it cannot be used as a component\n   * prop. This is platform-dependent and may be overwritten.\n   */\n  isReservedAttr: no,\n\n  /**\n   * Check if a tag is an unknown element.\n   * Platform-dependent.\n   */\n  isUnknownElement: no,\n\n  /**\n   * Get the namespace of an element\n   */\n  getTagNamespace: noop,\n\n  /**\n   * Parse the real tag name for the specific platform.\n   */\n  parsePlatformTagName: identity,\n\n  /**\n   * Check if an attribute must be bound using property, e.g. value\n   * Platform-dependent.\n   */\n  mustUseProp: no,\n\n  /**\n   * Perform updates asynchronously. Intended to be used by Vue Test Utils\n   * This will significantly reduce performance if set to false.\n   */\n  async: true,\n\n  /**\n   * Exposed for legacy reasons\n   */\n  _lifecycleHooks: LIFECYCLE_HOOKS\n});\n\n/*  */\n\n/**\n * unicode letters used for parsing html tags, component names and property paths.\n * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname\n * skipping \\u10000-\\uEFFFF due to it freezing up PhantomJS\n */\nvar unicodeRegExp = /a-zA-Z\\u00B7\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u203F-\\u2040\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD/;\n\n/**\n * Check if a string starts with $ or _\n */\nfunction isReserved (str) {\n  var c = (str + '').charCodeAt(0);\n  return c === 0x24 || c === 0x5F\n}\n\n/**\n * Define a property.\n */\nfunction def (obj, key, val, enumerable) {\n  Object.defineProperty(obj, key, {\n    value: val,\n    enumerable: !!enumerable,\n    writable: true,\n    configurable: true\n  });\n}\n\n/**\n * Parse simple path.\n */\nvar bailRE = new RegExp((\"[^\" + (unicodeRegExp.source) + \".$_\\\\d]\"));\nfunction parsePath (path) {\n  if (bailRE.test(path)) {\n    return\n  }\n  var segments = path.split('.');\n  return function (obj) {\n    for (var i = 0; i < segments.length; i++) {\n      if (!obj) { return }\n      obj = obj[segments[i]];\n    }\n    return obj\n  }\n}\n\n/*  */\n\n// can we use __proto__?\nvar hasProto = '__proto__' in {};\n\n// Browser environment sniffing\nvar inBrowser = typeof window !== 'undefined';\nvar inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;\nvar weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();\nvar UA = inBrowser && window.navigator.userAgent.toLowerCase();\nvar isIE = UA && /msie|trident/.test(UA);\nvar isIE9 = UA && UA.indexOf('msie 9.0') > 0;\nvar isEdge = UA && UA.indexOf('edge/') > 0;\nvar isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');\nvar isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');\nvar isChrome = UA && /chrome\\/\\d+/.test(UA) && !isEdge;\nvar isPhantomJS = UA && /phantomjs/.test(UA);\nvar isFF = UA && UA.match(/firefox\\/(\\d+)/);\n\n// Firefox has a \"watch\" function on Object.prototype...\nvar nativeWatch = ({}).watch;\n\nvar supportsPassive = false;\nif (inBrowser) {\n  try {\n    var opts = {};\n    Object.defineProperty(opts, 'passive', ({\n      get: function get () {\n        /* istanbul ignore next */\n        supportsPassive = true;\n      }\n    })); // https://github.com/facebook/flow/issues/285\n    window.addEventListener('test-passive', null, opts);\n  } catch (e) {}\n}\n\n// this needs to be lazy-evaled because vue may be required before\n// vue-server-renderer can set VUE_ENV\nvar _isServer;\nvar isServerRendering = function () {\n  if (_isServer === undefined) {\n    /* istanbul ignore if */\n    if (!inBrowser && !inWeex && typeof global !== 'undefined') {\n      // detect presence of vue-server-renderer and avoid\n      // Webpack shimming the process\n      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';\n    } else {\n      _isServer = false;\n    }\n  }\n  return _isServer\n};\n\n// detect devtools\nvar devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;\n\n/* istanbul ignore next */\nfunction isNative (Ctor) {\n  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())\n}\n\nvar hasSymbol =\n  typeof Symbol !== 'undefined' && isNative(Symbol) &&\n  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);\n\nvar _Set;\n/* istanbul ignore if */ // $flow-disable-line\nif (typeof Set !== 'undefined' && isNative(Set)) {\n  // use native Set when available.\n  _Set = Set;\n} else {\n  // a non-standard Set polyfill that only works with primitive keys.\n  _Set = /*@__PURE__*/(function () {\n    function Set () {\n      this.set = Object.create(null);\n    }\n    Set.prototype.has = function has (key) {\n      return this.set[key] === true\n    };\n    Set.prototype.add = function add (key) {\n      this.set[key] = true;\n    };\n    Set.prototype.clear = function clear () {\n      this.set = Object.create(null);\n    };\n\n    return Set;\n  }());\n}\n\n/*  */\n\nvar warn = noop;\nvar tip = noop;\nvar generateComponentTrace = (noop); // work around flow check\nvar formatComponentName = (noop);\n\nif (true) {\n  var hasConsole = typeof console !== 'undefined';\n  var classifyRE = /(?:^|[-_])(\\w)/g;\n  var classify = function (str) { return str\n    .replace(classifyRE, function (c) { return c.toUpperCase(); })\n    .replace(/[-_]/g, ''); };\n\n  warn = function (msg, vm) {\n    var trace = vm ? generateComponentTrace(vm) : '';\n\n    if (config.warnHandler) {\n      config.warnHandler.call(null, msg, vm, trace);\n    } else if (hasConsole && (!config.silent)) {\n      console.error((\"[Vue warn]: \" + msg + trace));\n    }\n  };\n\n  tip = function (msg, vm) {\n    if (hasConsole && (!config.silent)) {\n      console.warn(\"[Vue tip]: \" + msg + (\n        vm ? generateComponentTrace(vm) : ''\n      ));\n    }\n  };\n\n  formatComponentName = function (vm, includeFile) {\n    if (vm.$root === vm) {\n      return '<Root>'\n    }\n    var options = typeof vm === 'function' && vm.cid != null\n      ? vm.options\n      : vm._isVue\n        ? vm.$options || vm.constructor.options\n        : vm;\n    var name = options.name || options._componentTag;\n    var file = options.__file;\n    if (!name && file) {\n      var match = file.match(/([^/\\\\]+)\\.vue$/);\n      name = match && match[1];\n    }\n\n    return (\n      (name ? (\"<\" + (classify(name)) + \">\") : \"<Anonymous>\") +\n      (file && includeFile !== false ? (\" at \" + file) : '')\n    )\n  };\n\n  var repeat = function (str, n) {\n    var res = '';\n    while (n) {\n      if (n % 2 === 1) { res += str; }\n      if (n > 1) { str += str; }\n      n >>= 1;\n    }\n    return res\n  };\n\n  generateComponentTrace = function (vm) {\n    if (vm._isVue && vm.$parent) {\n      var tree = [];\n      var currentRecursiveSequence = 0;\n      while (vm) {\n        if (tree.length > 0) {\n          var last = tree[tree.length - 1];\n          if (last.constructor === vm.constructor) {\n            currentRecursiveSequence++;\n            vm = vm.$parent;\n            continue\n          } else if (currentRecursiveSequence > 0) {\n            tree[tree.length - 1] = [last, currentRecursiveSequence];\n            currentRecursiveSequence = 0;\n          }\n        }\n        tree.push(vm);\n        vm = vm.$parent;\n      }\n      return '\\n\\nfound in\\n\\n' + tree\n        .map(function (vm, i) { return (\"\" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)\n            ? ((formatComponentName(vm[0])) + \"... (\" + (vm[1]) + \" recursive calls)\")\n            : formatComponentName(vm))); })\n        .join('\\n')\n    } else {\n      return (\"\\n\\n(found in \" + (formatComponentName(vm)) + \")\")\n    }\n  };\n}\n\n/*  */\n\nvar uid = 0;\n\n/**\n * A dep is an observable that can have multiple\n * directives subscribing to it.\n */\nvar Dep = function Dep () {\n  this.id = uid++;\n  this.subs = [];\n};\n\nDep.prototype.addSub = function addSub (sub) {\n  this.subs.push(sub);\n};\n\nDep.prototype.removeSub = function removeSub (sub) {\n  remove(this.subs, sub);\n};\n\nDep.prototype.depend = function depend () {\n  if (Dep.target) {\n    Dep.target.addDep(this);\n  }\n};\n\nDep.prototype.notify = function notify () {\n  // stabilize the subscriber list first\n  var subs = this.subs.slice();\n  if ( true && !config.async) {\n    // subs aren't sorted in scheduler if not running async\n    // we need to sort them now to make sure they fire in correct\n    // order\n    subs.sort(function (a, b) { return a.id - b.id; });\n  }\n  for (var i = 0, l = subs.length; i < l; i++) {\n    subs[i].update();\n  }\n};\n\n// The current target watcher being evaluated.\n// This is globally unique because only one watcher\n// can be evaluated at a time.\nDep.target = null;\nvar targetStack = [];\n\nfunction pushTarget (target) {\n  targetStack.push(target);\n  Dep.target = target;\n}\n\nfunction popTarget () {\n  targetStack.pop();\n  Dep.target = targetStack[targetStack.length - 1];\n}\n\n/*  */\n\nvar VNode = function VNode (\n  tag,\n  data,\n  children,\n  text,\n  elm,\n  context,\n  componentOptions,\n  asyncFactory\n) {\n  this.tag = tag;\n  this.data = data;\n  this.children = children;\n  this.text = text;\n  this.elm = elm;\n  this.ns = undefined;\n  this.context = context;\n  this.fnContext = undefined;\n  this.fnOptions = undefined;\n  this.fnScopeId = undefined;\n  this.key = data && data.key;\n  this.componentOptions = componentOptions;\n  this.componentInstance = undefined;\n  this.parent = undefined;\n  this.raw = false;\n  this.isStatic = false;\n  this.isRootInsert = true;\n  this.isComment = false;\n  this.isCloned = false;\n  this.isOnce = false;\n  this.asyncFactory = asyncFactory;\n  this.asyncMeta = undefined;\n  this.isAsyncPlaceholder = false;\n};\n\nvar prototypeAccessors = { child: { configurable: true } };\n\n// DEPRECATED: alias for componentInstance for backwards compat.\n/* istanbul ignore next */\nprototypeAccessors.child.get = function () {\n  return this.componentInstance\n};\n\nObject.defineProperties( VNode.prototype, prototypeAccessors );\n\nvar createEmptyVNode = function (text) {\n  if ( text === void 0 ) text = '';\n\n  var node = new VNode();\n  node.text = text;\n  node.isComment = true;\n  return node\n};\n\nfunction createTextVNode (val) {\n  return new VNode(undefined, undefined, undefined, String(val))\n}\n\n// optimized shallow clone\n// used for static nodes and slot nodes because they may be reused across\n// multiple renders, cloning them avoids errors when DOM manipulations rely\n// on their elm reference.\nfunction cloneVNode (vnode) {\n  var cloned = new VNode(\n    vnode.tag,\n    vnode.data,\n    // #7975\n    // clone children array to avoid mutating original in case of cloning\n    // a child.\n    vnode.children && vnode.children.slice(),\n    vnode.text,\n    vnode.elm,\n    vnode.context,\n    vnode.componentOptions,\n    vnode.asyncFactory\n  );\n  cloned.ns = vnode.ns;\n  cloned.isStatic = vnode.isStatic;\n  cloned.key = vnode.key;\n  cloned.isComment = vnode.isComment;\n  cloned.fnContext = vnode.fnContext;\n  cloned.fnOptions = vnode.fnOptions;\n  cloned.fnScopeId = vnode.fnScopeId;\n  cloned.asyncMeta = vnode.asyncMeta;\n  cloned.isCloned = true;\n  return cloned\n}\n\n/*\n * not type checking this file because flow doesn't play well with\n * dynamically accessing methods on Array prototype\n */\n\nvar arrayProto = Array.prototype;\nvar arrayMethods = Object.create(arrayProto);\n\nvar methodsToPatch = [\n  'push',\n  'pop',\n  'shift',\n  'unshift',\n  'splice',\n  'sort',\n  'reverse'\n];\n\n/**\n * Intercept mutating methods and emit events\n */\nmethodsToPatch.forEach(function (method) {\n  // cache original method\n  var original = arrayProto[method];\n  def(arrayMethods, method, function mutator () {\n    var args = [], len = arguments.length;\n    while ( len-- ) args[ len ] = arguments[ len ];\n\n    var result = original.apply(this, args);\n    var ob = this.__ob__;\n    var inserted;\n    switch (method) {\n      case 'push':\n      case 'unshift':\n        inserted = args;\n        break\n      case 'splice':\n        inserted = args.slice(2);\n        break\n    }\n    if (inserted) { ob.observeArray(inserted); }\n    // notify change\n    ob.dep.notify();\n    return result\n  });\n});\n\n/*  */\n\nvar arrayKeys = Object.getOwnPropertyNames(arrayMethods);\n\n/**\n * In some cases we may want to disable observation inside a component's\n * update computation.\n */\nvar shouldObserve = true;\n\nfunction toggleObserving (value) {\n  shouldObserve = value;\n}\n\n/**\n * Observer class that is attached to each observed\n * object. Once attached, the observer converts the target\n * object's property keys into getter/setters that\n * collect dependencies and dispatch updates.\n */\nvar Observer = function Observer (value) {\n  this.value = value;\n  this.dep = new Dep();\n  this.vmCount = 0;\n  def(value, '__ob__', this);\n  if (Array.isArray(value)) {\n    if (hasProto) {\n      protoAugment(value, arrayMethods);\n    } else {\n      copyAugment(value, arrayMethods, arrayKeys);\n    }\n    this.observeArray(value);\n  } else {\n    this.walk(value);\n  }\n};\n\n/**\n * Walk through all properties and convert them into\n * getter/setters. This method should only be called when\n * value type is Object.\n */\nObserver.prototype.walk = function walk (obj) {\n  var keys = Object.keys(obj);\n  for (var i = 0; i < keys.length; i++) {\n    defineReactive$$1(obj, keys[i]);\n  }\n};\n\n/**\n * Observe a list of Array items.\n */\nObserver.prototype.observeArray = function observeArray (items) {\n  for (var i = 0, l = items.length; i < l; i++) {\n    observe(items[i]);\n  }\n};\n\n// helpers\n\n/**\n * Augment a target Object or Array by intercepting\n * the prototype chain using __proto__\n */\nfunction protoAugment (target, src) {\n  /* eslint-disable no-proto */\n  target.__proto__ = src;\n  /* eslint-enable no-proto */\n}\n\n/**\n * Augment a target Object or Array by defining\n * hidden properties.\n */\n/* istanbul ignore next */\nfunction copyAugment (target, src, keys) {\n  for (var i = 0, l = keys.length; i < l; i++) {\n    var key = keys[i];\n    def(target, key, src[key]);\n  }\n}\n\n/**\n * Attempt to create an observer instance for a value,\n * returns the new observer if successfully observed,\n * or the existing observer if the value already has one.\n */\nfunction observe (value, asRootData) {\n  if (!isObject(value) || value instanceof VNode) {\n    return\n  }\n  var ob;\n  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {\n    ob = value.__ob__;\n  } else if (\n    shouldObserve &&\n    !isServerRendering() &&\n    (Array.isArray(value) || isPlainObject(value)) &&\n    Object.isExtensible(value) &&\n    !value._isVue\n  ) {\n    ob = new Observer(value);\n  }\n  if (asRootData && ob) {\n    ob.vmCount++;\n  }\n  return ob\n}\n\n/**\n * Define a reactive property on an Object.\n */\nfunction defineReactive$$1 (\n  obj,\n  key,\n  val,\n  customSetter,\n  shallow\n) {\n  var dep = new Dep();\n\n  var property = Object.getOwnPropertyDescriptor(obj, key);\n  if (property && property.configurable === false) {\n    return\n  }\n\n  // cater for pre-defined getter/setters\n  var getter = property && property.get;\n  var setter = property && property.set;\n  if ((!getter || setter) && arguments.length === 2) {\n    val = obj[key];\n  }\n\n  var childOb = !shallow && observe(val);\n  Object.defineProperty(obj, key, {\n    enumerable: true,\n    configurable: true,\n    get: function reactiveGetter () {\n      var value = getter ? getter.call(obj) : val;\n      if (Dep.target) {\n        dep.depend();\n        if (childOb) {\n          childOb.dep.depend();\n          if (Array.isArray(value)) {\n            dependArray(value);\n          }\n        }\n      }\n      return value\n    },\n    set: function reactiveSetter (newVal) {\n      var value = getter ? getter.call(obj) : val;\n      /* eslint-disable no-self-compare */\n      if (newVal === value || (newVal !== newVal && value !== value)) {\n        return\n      }\n      /* eslint-enable no-self-compare */\n      if ( true && customSetter) {\n        customSetter();\n      }\n      // #7981: for accessor properties without setter\n      if (getter && !setter) { return }\n      if (setter) {\n        setter.call(obj, newVal);\n      } else {\n        val = newVal;\n      }\n      childOb = !shallow && observe(newVal);\n      dep.notify();\n    }\n  });\n}\n\n/**\n * Set a property on an object. Adds the new property and\n * triggers change notification if the property doesn't\n * already exist.\n */\nfunction set (target, key, val) {\n  if ( true &&\n    (isUndef(target) || isPrimitive(target))\n  ) {\n    warn((\"Cannot set reactive property on undefined, null, or primitive value: \" + ((target))));\n  }\n  if (Array.isArray(target) && isValidArrayIndex(key)) {\n    target.length = Math.max(target.length, key);\n    target.splice(key, 1, val);\n    return val\n  }\n  if (key in target && !(key in Object.prototype)) {\n    target[key] = val;\n    return val\n  }\n  var ob = (target).__ob__;\n  if (target._isVue || (ob && ob.vmCount)) {\n     true && warn(\n      'Avoid adding reactive properties to a Vue instance or its root $data ' +\n      'at runtime - declare it upfront in the data option.'\n    );\n    return val\n  }\n  if (!ob) {\n    target[key] = val;\n    return val\n  }\n  defineReactive$$1(ob.value, key, val);\n  ob.dep.notify();\n  return val\n}\n\n/**\n * Delete a property and trigger change if necessary.\n */\nfunction del (target, key) {\n  if ( true &&\n    (isUndef(target) || isPrimitive(target))\n  ) {\n    warn((\"Cannot delete reactive property on undefined, null, or primitive value: \" + ((target))));\n  }\n  if (Array.isArray(target) && isValidArrayIndex(key)) {\n    target.splice(key, 1);\n    return\n  }\n  var ob = (target).__ob__;\n  if (target._isVue || (ob && ob.vmCount)) {\n     true && warn(\n      'Avoid deleting properties on a Vue instance or its root $data ' +\n      '- just set it to null.'\n    );\n    return\n  }\n  if (!hasOwn(target, key)) {\n    return\n  }\n  delete target[key];\n  if (!ob) {\n    return\n  }\n  ob.dep.notify();\n}\n\n/**\n * Collect dependencies on array elements when the array is touched, since\n * we cannot intercept array element access like property getters.\n */\nfunction dependArray (value) {\n  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {\n    e = value[i];\n    e && e.__ob__ && e.__ob__.dep.depend();\n    if (Array.isArray(e)) {\n      dependArray(e);\n    }\n  }\n}\n\n/*  */\n\n/**\n * Option overwriting strategies are functions that handle\n * how to merge a parent option value and a child option\n * value into the final value.\n */\nvar strats = config.optionMergeStrategies;\n\n/**\n * Options with restrictions\n */\nif (true) {\n  strats.el = strats.propsData = function (parent, child, vm, key) {\n    if (!vm) {\n      warn(\n        \"option \\\"\" + key + \"\\\" can only be used during instance \" +\n        'creation with the `new` keyword.'\n      );\n    }\n    return defaultStrat(parent, child)\n  };\n}\n\n/**\n * Helper that recursively merges two data objects together.\n */\nfunction mergeData (to, from) {\n  if (!from) { return to }\n  var key, toVal, fromVal;\n\n  var keys = hasSymbol\n    ? Reflect.ownKeys(from)\n    : Object.keys(from);\n\n  for (var i = 0; i < keys.length; i++) {\n    key = keys[i];\n    // in case the object is already observed...\n    if (key === '__ob__') { continue }\n    toVal = to[key];\n    fromVal = from[key];\n    if (!hasOwn(to, key)) {\n      set(to, key, fromVal);\n    } else if (\n      toVal !== fromVal &&\n      isPlainObject(toVal) &&\n      isPlainObject(fromVal)\n    ) {\n      mergeData(toVal, fromVal);\n    }\n  }\n  return to\n}\n\n/**\n * Data\n */\nfunction mergeDataOrFn (\n  parentVal,\n  childVal,\n  vm\n) {\n  if (!vm) {\n    // in a Vue.extend merge, both should be functions\n    if (!childVal) {\n      return parentVal\n    }\n    if (!parentVal) {\n      return childVal\n    }\n    // when parentVal & childVal are both present,\n    // we need to return a function that returns the\n    // merged result of both functions... no need to\n    // check if parentVal is a function here because\n    // it has to be a function to pass previous merges.\n    return function mergedDataFn () {\n      return mergeData(\n        typeof childVal === 'function' ? childVal.call(this, this) : childVal,\n        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal\n      )\n    }\n  } else {\n    return function mergedInstanceDataFn () {\n      // instance merge\n      var instanceData = typeof childVal === 'function'\n        ? childVal.call(vm, vm)\n        : childVal;\n      var defaultData = typeof parentVal === 'function'\n        ? parentVal.call(vm, vm)\n        : parentVal;\n      if (instanceData) {\n        return mergeData(instanceData, defaultData)\n      } else {\n        return defaultData\n      }\n    }\n  }\n}\n\nstrats.data = function (\n  parentVal,\n  childVal,\n  vm\n) {\n  if (!vm) {\n    if (childVal && typeof childVal !== 'function') {\n       true && warn(\n        'The \"data\" option should be a function ' +\n        'that returns a per-instance value in component ' +\n        'definitions.',\n        vm\n      );\n\n      return parentVal\n    }\n    return mergeDataOrFn(parentVal, childVal)\n  }\n\n  return mergeDataOrFn(parentVal, childVal, vm)\n};\n\n/**\n * Hooks and props are merged as arrays.\n */\nfunction mergeHook (\n  parentVal,\n  childVal\n) {\n  var res = childVal\n    ? parentVal\n      ? parentVal.concat(childVal)\n      : Array.isArray(childVal)\n        ? childVal\n        : [childVal]\n    : parentVal;\n  return res\n    ? dedupeHooks(res)\n    : res\n}\n\nfunction dedupeHooks (hooks) {\n  var res = [];\n  for (var i = 0; i < hooks.length; i++) {\n    if (res.indexOf(hooks[i]) === -1) {\n      res.push(hooks[i]);\n    }\n  }\n  return res\n}\n\nLIFECYCLE_HOOKS.forEach(function (hook) {\n  strats[hook] = mergeHook;\n});\n\n/**\n * Assets\n *\n * When a vm is present (instance creation), we need to do\n * a three-way merge between constructor options, instance\n * options and parent options.\n */\nfunction mergeAssets (\n  parentVal,\n  childVal,\n  vm,\n  key\n) {\n  var res = Object.create(parentVal || null);\n  if (childVal) {\n     true && assertObjectType(key, childVal, vm);\n    return extend(res, childVal)\n  } else {\n    return res\n  }\n}\n\nASSET_TYPES.forEach(function (type) {\n  strats[type + 's'] = mergeAssets;\n});\n\n/**\n * Watchers.\n *\n * Watchers hashes should not overwrite one\n * another, so we merge them as arrays.\n */\nstrats.watch = function (\n  parentVal,\n  childVal,\n  vm,\n  key\n) {\n  // work around Firefox's Object.prototype.watch...\n  if (parentVal === nativeWatch) { parentVal = undefined; }\n  if (childVal === nativeWatch) { childVal = undefined; }\n  /* istanbul ignore if */\n  if (!childVal) { return Object.create(parentVal || null) }\n  if (true) {\n    assertObjectType(key, childVal, vm);\n  }\n  if (!parentVal) { return childVal }\n  var ret = {};\n  extend(ret, parentVal);\n  for (var key$1 in childVal) {\n    var parent = ret[key$1];\n    var child = childVal[key$1];\n    if (parent && !Array.isArray(parent)) {\n      parent = [parent];\n    }\n    ret[key$1] = parent\n      ? parent.concat(child)\n      : Array.isArray(child) ? child : [child];\n  }\n  return ret\n};\n\n/**\n * Other object hashes.\n */\nstrats.props =\nstrats.methods =\nstrats.inject =\nstrats.computed = function (\n  parentVal,\n  childVal,\n  vm,\n  key\n) {\n  if (childVal && \"development\" !== 'production') {\n    assertObjectType(key, childVal, vm);\n  }\n  if (!parentVal) { return childVal }\n  var ret = Object.create(null);\n  extend(ret, parentVal);\n  if (childVal) { extend(ret, childVal); }\n  return ret\n};\nstrats.provide = mergeDataOrFn;\n\n/**\n * Default strategy.\n */\nvar defaultStrat = function (parentVal, childVal) {\n  return childVal === undefined\n    ? parentVal\n    : childVal\n};\n\n/**\n * Validate component names\n */\nfunction checkComponents (options) {\n  for (var key in options.components) {\n    validateComponentName(key);\n  }\n}\n\nfunction validateComponentName (name) {\n  if (!new RegExp((\"^[a-zA-Z][\\\\-\\\\.0-9_\" + (unicodeRegExp.source) + \"]*$\")).test(name)) {\n    warn(\n      'Invalid component name: \"' + name + '\". Component names ' +\n      'should conform to valid custom element name in html5 specification.'\n    );\n  }\n  if (isBuiltInTag(name) || config.isReservedTag(name)) {\n    warn(\n      'Do not use built-in or reserved HTML elements as component ' +\n      'id: ' + name\n    );\n  }\n}\n\n/**\n * Ensure all props option syntax are normalized into the\n * Object-based format.\n */\nfunction normalizeProps (options, vm) {\n  var props = options.props;\n  if (!props) { return }\n  var res = {};\n  var i, val, name;\n  if (Array.isArray(props)) {\n    i = props.length;\n    while (i--) {\n      val = props[i];\n      if (typeof val === 'string') {\n        name = camelize(val);\n        res[name] = { type: null };\n      } else if (true) {\n        warn('props must be strings when using array syntax.');\n      }\n    }\n  } else if (isPlainObject(props)) {\n    for (var key in props) {\n      val = props[key];\n      name = camelize(key);\n      res[name] = isPlainObject(val)\n        ? val\n        : { type: val };\n    }\n  } else if (true) {\n    warn(\n      \"Invalid value for option \\\"props\\\": expected an Array or an Object, \" +\n      \"but got \" + (toRawType(props)) + \".\",\n      vm\n    );\n  }\n  options.props = res;\n}\n\n/**\n * Normalize all injections into Object-based format\n */\nfunction normalizeInject (options, vm) {\n  var inject = options.inject;\n  if (!inject) { return }\n  var normalized = options.inject = {};\n  if (Array.isArray(inject)) {\n    for (var i = 0; i < inject.length; i++) {\n      normalized[inject[i]] = { from: inject[i] };\n    }\n  } else if (isPlainObject(inject)) {\n    for (var key in inject) {\n      var val = inject[key];\n      normalized[key] = isPlainObject(val)\n        ? extend({ from: key }, val)\n        : { from: val };\n    }\n  } else if (true) {\n    warn(\n      \"Invalid value for option \\\"inject\\\": expected an Array or an Object, \" +\n      \"but got \" + (toRawType(inject)) + \".\",\n      vm\n    );\n  }\n}\n\n/**\n * Normalize raw function directives into object format.\n */\nfunction normalizeDirectives (options) {\n  var dirs = options.directives;\n  if (dirs) {\n    for (var key in dirs) {\n      var def$$1 = dirs[key];\n      if (typeof def$$1 === 'function') {\n        dirs[key] = { bind: def$$1, update: def$$1 };\n      }\n    }\n  }\n}\n\nfunction assertObjectType (name, value, vm) {\n  if (!isPlainObject(value)) {\n    warn(\n      \"Invalid value for option \\\"\" + name + \"\\\": expected an Object, \" +\n      \"but got \" + (toRawType(value)) + \".\",\n      vm\n    );\n  }\n}\n\n/**\n * Merge two option objects into a new one.\n * Core utility used in both instantiation and inheritance.\n */\nfunction mergeOptions (\n  parent,\n  child,\n  vm\n) {\n  if (true) {\n    checkComponents(child);\n  }\n\n  if (typeof child === 'function') {\n    child = child.options;\n  }\n\n  normalizeProps(child, vm);\n  normalizeInject(child, vm);\n  normalizeDirectives(child);\n\n  // Apply extends and mixins on the child options,\n  // but only if it is a raw options object that isn't\n  // the result of another mergeOptions call.\n  // Only merged options has the _base property.\n  if (!child._base) {\n    if (child.extends) {\n      parent = mergeOptions(parent, child.extends, vm);\n    }\n    if (child.mixins) {\n      for (var i = 0, l = child.mixins.length; i < l; i++) {\n        parent = mergeOptions(parent, child.mixins[i], vm);\n      }\n    }\n  }\n\n  var options = {};\n  var key;\n  for (key in parent) {\n    mergeField(key);\n  }\n  for (key in child) {\n    if (!hasOwn(parent, key)) {\n      mergeField(key);\n    }\n  }\n  function mergeField (key) {\n    var strat = strats[key] || defaultStrat;\n    options[key] = strat(parent[key], child[key], vm, key);\n  }\n  return options\n}\n\n/**\n * Resolve an asset.\n * This function is used because child instances need access\n * to assets defined in its ancestor chain.\n */\nfunction resolveAsset (\n  options,\n  type,\n  id,\n  warnMissing\n) {\n  /* istanbul ignore if */\n  if (typeof id !== 'string') {\n    return\n  }\n  var assets = options[type];\n  // check local registration variations first\n  if (hasOwn(assets, id)) { return assets[id] }\n  var camelizedId = camelize(id);\n  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }\n  var PascalCaseId = capitalize(camelizedId);\n  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }\n  // fallback to prototype chain\n  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];\n  if ( true && warnMissing && !res) {\n    warn(\n      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,\n      options\n    );\n  }\n  return res\n}\n\n/*  */\n\n\n\nfunction validateProp (\n  key,\n  propOptions,\n  propsData,\n  vm\n) {\n  var prop = propOptions[key];\n  var absent = !hasOwn(propsData, key);\n  var value = propsData[key];\n  // boolean casting\n  var booleanIndex = getTypeIndex(Boolean, prop.type);\n  if (booleanIndex > -1) {\n    if (absent && !hasOwn(prop, 'default')) {\n      value = false;\n    } else if (value === '' || value === hyphenate(key)) {\n      // only cast empty string / same name to boolean if\n      // boolean has higher priority\n      var stringIndex = getTypeIndex(String, prop.type);\n      if (stringIndex < 0 || booleanIndex < stringIndex) {\n        value = true;\n      }\n    }\n  }\n  // check default value\n  if (value === undefined) {\n    value = getPropDefaultValue(vm, prop, key);\n    // since the default value is a fresh copy,\n    // make sure to observe it.\n    var prevShouldObserve = shouldObserve;\n    toggleObserving(true);\n    observe(value);\n    toggleObserving(prevShouldObserve);\n  }\n  if (\n    true\n  ) {\n    assertProp(prop, key, value, vm, absent);\n  }\n  return value\n}\n\n/**\n * Get the default value of a prop.\n */\nfunction getPropDefaultValue (vm, prop, key) {\n  // no default, return undefined\n  if (!hasOwn(prop, 'default')) {\n    return undefined\n  }\n  var def = prop.default;\n  // warn against non-factory defaults for Object & Array\n  if ( true && isObject(def)) {\n    warn(\n      'Invalid default value for prop \"' + key + '\": ' +\n      'Props with type Object/Array must use a factory function ' +\n      'to return the default value.',\n      vm\n    );\n  }\n  // the raw prop value was also undefined from previous render,\n  // return previous default value to avoid unnecessary watcher trigger\n  if (vm && vm.$options.propsData &&\n    vm.$options.propsData[key] === undefined &&\n    vm._props[key] !== undefined\n  ) {\n    return vm._props[key]\n  }\n  // call factory function for non-Function types\n  // a value is Function if its prototype is function even across different execution context\n  return typeof def === 'function' && getType(prop.type) !== 'Function'\n    ? def.call(vm)\n    : def\n}\n\n/**\n * Assert whether a prop is valid.\n */\nfunction assertProp (\n  prop,\n  name,\n  value,\n  vm,\n  absent\n) {\n  if (prop.required && absent) {\n    warn(\n      'Missing required prop: \"' + name + '\"',\n      vm\n    );\n    return\n  }\n  if (value == null && !prop.required) {\n    return\n  }\n  var type = prop.type;\n  var valid = !type || type === true;\n  var expectedTypes = [];\n  if (type) {\n    if (!Array.isArray(type)) {\n      type = [type];\n    }\n    for (var i = 0; i < type.length && !valid; i++) {\n      var assertedType = assertType(value, type[i]);\n      expectedTypes.push(assertedType.expectedType || '');\n      valid = assertedType.valid;\n    }\n  }\n\n  if (!valid) {\n    warn(\n      getInvalidTypeMessage(name, value, expectedTypes),\n      vm\n    );\n    return\n  }\n  var validator = prop.validator;\n  if (validator) {\n    if (!validator(value)) {\n      warn(\n        'Invalid prop: custom validator check failed for prop \"' + name + '\".',\n        vm\n      );\n    }\n  }\n}\n\nvar simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;\n\nfunction assertType (value, type) {\n  var valid;\n  var expectedType = getType(type);\n  if (simpleCheckRE.test(expectedType)) {\n    var t = typeof value;\n    valid = t === expectedType.toLowerCase();\n    // for primitive wrapper objects\n    if (!valid && t === 'object') {\n      valid = value instanceof type;\n    }\n  } else if (expectedType === 'Object') {\n    valid = isPlainObject(value);\n  } else if (expectedType === 'Array') {\n    valid = Array.isArray(value);\n  } else {\n    valid = value instanceof type;\n  }\n  return {\n    valid: valid,\n    expectedType: expectedType\n  }\n}\n\n/**\n * Use function string name to check built-in types,\n * because a simple equality check will fail when running\n * across different vms / iframes.\n */\nfunction getType (fn) {\n  var match = fn && fn.toString().match(/^\\s*function (\\w+)/);\n  return match ? match[1] : ''\n}\n\nfunction isSameType (a, b) {\n  return getType(a) === getType(b)\n}\n\nfunction getTypeIndex (type, expectedTypes) {\n  if (!Array.isArray(expectedTypes)) {\n    return isSameType(expectedTypes, type) ? 0 : -1\n  }\n  for (var i = 0, len = expectedTypes.length; i < len; i++) {\n    if (isSameType(expectedTypes[i], type)) {\n      return i\n    }\n  }\n  return -1\n}\n\nfunction getInvalidTypeMessage (name, value, expectedTypes) {\n  var message = \"Invalid prop: type check failed for prop \\\"\" + name + \"\\\".\" +\n    \" Expected \" + (expectedTypes.map(capitalize).join(', '));\n  var expectedType = expectedTypes[0];\n  var receivedType = toRawType(value);\n  var expectedValue = styleValue(value, expectedType);\n  var receivedValue = styleValue(value, receivedType);\n  // check if we need to specify expected value\n  if (expectedTypes.length === 1 &&\n      isExplicable(expectedType) &&\n      !isBoolean(expectedType, receivedType)) {\n    message += \" with value \" + expectedValue;\n  }\n  message += \", got \" + receivedType + \" \";\n  // check if we need to specify received value\n  if (isExplicable(receivedType)) {\n    message += \"with value \" + receivedValue + \".\";\n  }\n  return message\n}\n\nfunction styleValue (value, type) {\n  if (type === 'String') {\n    return (\"\\\"\" + value + \"\\\"\")\n  } else if (type === 'Number') {\n    return (\"\" + (Number(value)))\n  } else {\n    return (\"\" + value)\n  }\n}\n\nfunction isExplicable (value) {\n  var explicitTypes = ['string', 'number', 'boolean'];\n  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })\n}\n\nfunction isBoolean () {\n  var args = [], len = arguments.length;\n  while ( len-- ) args[ len ] = arguments[ len ];\n\n  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })\n}\n\n/*  */\n\nfunction handleError (err, vm, info) {\n  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.\n  // See: https://github.com/vuejs/vuex/issues/1505\n  pushTarget();\n  try {\n    if (vm) {\n      var cur = vm;\n      while ((cur = cur.$parent)) {\n        var hooks = cur.$options.errorCaptured;\n        if (hooks) {\n          for (var i = 0; i < hooks.length; i++) {\n            try {\n              var capture = hooks[i].call(cur, err, vm, info) === false;\n              if (capture) { return }\n            } catch (e) {\n              globalHandleError(e, cur, 'errorCaptured hook');\n            }\n          }\n        }\n      }\n    }\n    globalHandleError(err, vm, info);\n  } finally {\n    popTarget();\n  }\n}\n\nfunction invokeWithErrorHandling (\n  handler,\n  context,\n  args,\n  vm,\n  info\n) {\n  var res;\n  try {\n    res = args ? handler.apply(context, args) : handler.call(context);\n    if (res && !res._isVue && isPromise(res) && !res._handled) {\n      res.catch(function (e) { return handleError(e, vm, info + \" (Promise/async)\"); });\n      // issue #9511\n      // avoid catch triggering multiple times when nested calls\n      res._handled = true;\n    }\n  } catch (e) {\n    handleError(e, vm, info);\n  }\n  return res\n}\n\nfunction globalHandleError (err, vm, info) {\n  if (config.errorHandler) {\n    try {\n      return config.errorHandler.call(null, err, vm, info)\n    } catch (e) {\n      // if the user intentionally throws the original error in the handler,\n      // do not log it twice\n      if (e !== err) {\n        logError(e, null, 'config.errorHandler');\n      }\n    }\n  }\n  logError(err, vm, info);\n}\n\nfunction logError (err, vm, info) {\n  if (true) {\n    warn((\"Error in \" + info + \": \\\"\" + (err.toString()) + \"\\\"\"), vm);\n  }\n  /* istanbul ignore else */\n  if ((inBrowser || inWeex) && typeof console !== 'undefined') {\n    console.error(err);\n  } else {\n    throw err\n  }\n}\n\n/*  */\n\nvar isUsingMicroTask = false;\n\nvar callbacks = [];\nvar pending = false;\n\nfunction flushCallbacks () {\n  pending = false;\n  var copies = callbacks.slice(0);\n  callbacks.length = 0;\n  for (var i = 0; i < copies.length; i++) {\n    copies[i]();\n  }\n}\n\n// Here we have async deferring wrappers using microtasks.\n// In 2.5 we used (macro) tasks (in combination with microtasks).\n// However, it has subtle problems when state is changed right before repaint\n// (e.g. #6813, out-in transitions).\n// Also, using (macro) tasks in event handler would cause some weird behaviors\n// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).\n// So we now use microtasks everywhere, again.\n// A major drawback of this tradeoff is that there are some scenarios\n// where microtasks have too high a priority and fire in between supposedly\n// sequential events (e.g. #4521, #6690, which have workarounds)\n// or even between bubbling of the same event (#6566).\nvar timerFunc;\n\n// The nextTick behavior leverages the microtask queue, which can be accessed\n// via either native Promise.then or MutationObserver.\n// MutationObserver has wider support, however it is seriously bugged in\n// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It\n// completely stops working after triggering a few times... so, if native\n// Promise is available, we will use it:\n/* istanbul ignore next, $flow-disable-line */\nif (typeof Promise !== 'undefined' && isNative(Promise)) {\n  var p = Promise.resolve();\n  timerFunc = function () {\n    p.then(flushCallbacks);\n    // In problematic UIWebViews, Promise.then doesn't completely break, but\n    // it can get stuck in a weird state where callbacks are pushed into the\n    // microtask queue but the queue isn't being flushed, until the browser\n    // needs to do some other work, e.g. handle a timer. Therefore we can\n    // \"force\" the microtask queue to be flushed by adding an empty timer.\n    if (isIOS) { setTimeout(noop); }\n  };\n  isUsingMicroTask = true;\n} else if (!isIE && typeof MutationObserver !== 'undefined' && (\n  isNative(MutationObserver) ||\n  // PhantomJS and iOS 7.x\n  MutationObserver.toString() === '[object MutationObserverConstructor]'\n)) {\n  // Use MutationObserver where native Promise is not available,\n  // e.g. PhantomJS, iOS7, Android 4.4\n  // (#6466 MutationObserver is unreliable in IE11)\n  var counter = 1;\n  var observer = new MutationObserver(flushCallbacks);\n  var textNode = document.createTextNode(String(counter));\n  observer.observe(textNode, {\n    characterData: true\n  });\n  timerFunc = function () {\n    counter = (counter + 1) % 2;\n    textNode.data = String(counter);\n  };\n  isUsingMicroTask = true;\n} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {\n  // Fallback to setImmediate.\n  // Techinically it leverages the (macro) task queue,\n  // but it is still a better choice than setTimeout.\n  timerFunc = function () {\n    setImmediate(flushCallbacks);\n  };\n} else {\n  // Fallback to setTimeout.\n  timerFunc = function () {\n    setTimeout(flushCallbacks, 0);\n  };\n}\n\nfunction nextTick (cb, ctx) {\n  var _resolve;\n  callbacks.push(function () {\n    if (cb) {\n      try {\n        cb.call(ctx);\n      } catch (e) {\n        handleError(e, ctx, 'nextTick');\n      }\n    } else if (_resolve) {\n      _resolve(ctx);\n    }\n  });\n  if (!pending) {\n    pending = true;\n    timerFunc();\n  }\n  // $flow-disable-line\n  if (!cb && typeof Promise !== 'undefined') {\n    return new Promise(function (resolve) {\n      _resolve = resolve;\n    })\n  }\n}\n\n/*  */\n\n/* not type checking this file because flow doesn't play well with Proxy */\n\nvar initProxy;\n\nif (true) {\n  var allowedGlobals = makeMap(\n    'Infinity,undefined,NaN,isFinite,isNaN,' +\n    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +\n    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +\n    'require' // for Webpack/Browserify\n  );\n\n  var warnNonPresent = function (target, key) {\n    warn(\n      \"Property or method \\\"\" + key + \"\\\" is not defined on the instance but \" +\n      'referenced during render. Make sure that this property is reactive, ' +\n      'either in the data option, or for class-based components, by ' +\n      'initializing the property. ' +\n      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',\n      target\n    );\n  };\n\n  var warnReservedPrefix = function (target, key) {\n    warn(\n      \"Property \\\"\" + key + \"\\\" must be accessed with \\\"$data.\" + key + \"\\\" because \" +\n      'properties starting with \"$\" or \"_\" are not proxied in the Vue instance to ' +\n      'prevent conflicts with Vue internals' +\n      'See: https://vuejs.org/v2/api/#data',\n      target\n    );\n  };\n\n  var hasProxy =\n    typeof Proxy !== 'undefined' && isNative(Proxy);\n\n  if (hasProxy) {\n    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');\n    config.keyCodes = new Proxy(config.keyCodes, {\n      set: function set (target, key, value) {\n        if (isBuiltInModifier(key)) {\n          warn((\"Avoid overwriting built-in modifier in config.keyCodes: .\" + key));\n          return false\n        } else {\n          target[key] = value;\n          return true\n        }\n      }\n    });\n  }\n\n  var hasHandler = {\n    has: function has (target, key) {\n      var has = key in target;\n      var isAllowed = allowedGlobals(key) ||\n        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));\n      if (!has && !isAllowed) {\n        if (key in target.$data) { warnReservedPrefix(target, key); }\n        else { warnNonPresent(target, key); }\n      }\n      return has || !isAllowed\n    }\n  };\n\n  var getHandler = {\n    get: function get (target, key) {\n      if (typeof key === 'string' && !(key in target)) {\n        if (key in target.$data) { warnReservedPrefix(target, key); }\n        else { warnNonPresent(target, key); }\n      }\n      return target[key]\n    }\n  };\n\n  initProxy = function initProxy (vm) {\n    if (hasProxy) {\n      // determine which proxy handler to use\n      var options = vm.$options;\n      var handlers = options.render && options.render._withStripped\n        ? getHandler\n        : hasHandler;\n      vm._renderProxy = new Proxy(vm, handlers);\n    } else {\n      vm._renderProxy = vm;\n    }\n  };\n}\n\n/*  */\n\nvar seenObjects = new _Set();\n\n/**\n * Recursively traverse an object to evoke all converted\n * getters, so that every nested property inside the object\n * is collected as a \"deep\" dependency.\n */\nfunction traverse (val) {\n  _traverse(val, seenObjects);\n  seenObjects.clear();\n}\n\nfunction _traverse (val, seen) {\n  var i, keys;\n  var isA = Array.isArray(val);\n  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {\n    return\n  }\n  if (val.__ob__) {\n    var depId = val.__ob__.dep.id;\n    if (seen.has(depId)) {\n      return\n    }\n    seen.add(depId);\n  }\n  if (isA) {\n    i = val.length;\n    while (i--) { _traverse(val[i], seen); }\n  } else {\n    keys = Object.keys(val);\n    i = keys.length;\n    while (i--) { _traverse(val[keys[i]], seen); }\n  }\n}\n\nvar mark;\nvar measure;\n\nif (true) {\n  var perf = inBrowser && window.performance;\n  /* istanbul ignore if */\n  if (\n    perf &&\n    perf.mark &&\n    perf.measure &&\n    perf.clearMarks &&\n    perf.clearMeasures\n  ) {\n    mark = function (tag) { return perf.mark(tag); };\n    measure = function (name, startTag, endTag) {\n      perf.measure(name, startTag, endTag);\n      perf.clearMarks(startTag);\n      perf.clearMarks(endTag);\n      // perf.clearMeasures(name)\n    };\n  }\n}\n\n/*  */\n\nvar normalizeEvent = cached(function (name) {\n  var passive = name.charAt(0) === '&';\n  name = passive ? name.slice(1) : name;\n  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first\n  name = once$$1 ? name.slice(1) : name;\n  var capture = name.charAt(0) === '!';\n  name = capture ? name.slice(1) : name;\n  return {\n    name: name,\n    once: once$$1,\n    capture: capture,\n    passive: passive\n  }\n});\n\nfunction createFnInvoker (fns, vm) {\n  function invoker () {\n    var arguments$1 = arguments;\n\n    var fns = invoker.fns;\n    if (Array.isArray(fns)) {\n      var cloned = fns.slice();\n      for (var i = 0; i < cloned.length; i++) {\n        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, \"v-on handler\");\n      }\n    } else {\n      // return handler return value for single handlers\n      return invokeWithErrorHandling(fns, null, arguments, vm, \"v-on handler\")\n    }\n  }\n  invoker.fns = fns;\n  return invoker\n}\n\nfunction updateListeners (\n  on,\n  oldOn,\n  add,\n  remove$$1,\n  createOnceHandler,\n  vm\n) {\n  var name, def$$1, cur, old, event;\n  for (name in on) {\n    def$$1 = cur = on[name];\n    old = oldOn[name];\n    event = normalizeEvent(name);\n    if (isUndef(cur)) {\n       true && warn(\n        \"Invalid handler for event \\\"\" + (event.name) + \"\\\": got \" + String(cur),\n        vm\n      );\n    } else if (isUndef(old)) {\n      if (isUndef(cur.fns)) {\n        cur = on[name] = createFnInvoker(cur, vm);\n      }\n      if (isTrue(event.once)) {\n        cur = on[name] = createOnceHandler(event.name, cur, event.capture);\n      }\n      add(event.name, cur, event.capture, event.passive, event.params);\n    } else if (cur !== old) {\n      old.fns = cur;\n      on[name] = old;\n    }\n  }\n  for (name in oldOn) {\n    if (isUndef(on[name])) {\n      event = normalizeEvent(name);\n      remove$$1(event.name, oldOn[name], event.capture);\n    }\n  }\n}\n\n/*  */\n\nfunction mergeVNodeHook (def, hookKey, hook) {\n  if (def instanceof VNode) {\n    def = def.data.hook || (def.data.hook = {});\n  }\n  var invoker;\n  var oldHook = def[hookKey];\n\n  function wrappedHook () {\n    hook.apply(this, arguments);\n    // important: remove merged hook to ensure it's called only once\n    // and prevent memory leak\n    remove(invoker.fns, wrappedHook);\n  }\n\n  if (isUndef(oldHook)) {\n    // no existing hook\n    invoker = createFnInvoker([wrappedHook]);\n  } else {\n    /* istanbul ignore if */\n    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {\n      // already a merged invoker\n      invoker = oldHook;\n      invoker.fns.push(wrappedHook);\n    } else {\n      // existing plain hook\n      invoker = createFnInvoker([oldHook, wrappedHook]);\n    }\n  }\n\n  invoker.merged = true;\n  def[hookKey] = invoker;\n}\n\n/*  */\n\nfunction extractPropsFromVNodeData (\n  data,\n  Ctor,\n  tag\n) {\n  // we are only extracting raw values here.\n  // validation and default values are handled in the child\n  // component itself.\n  var propOptions = Ctor.options.props;\n  if (isUndef(propOptions)) {\n    return\n  }\n  var res = {};\n  var attrs = data.attrs;\n  var props = data.props;\n  if (isDef(attrs) || isDef(props)) {\n    for (var key in propOptions) {\n      var altKey = hyphenate(key);\n      if (true) {\n        var keyInLowerCase = key.toLowerCase();\n        if (\n          key !== keyInLowerCase &&\n          attrs && hasOwn(attrs, keyInLowerCase)\n        ) {\n          tip(\n            \"Prop \\\"\" + keyInLowerCase + \"\\\" is passed to component \" +\n            (formatComponentName(tag || Ctor)) + \", but the declared prop name is\" +\n            \" \\\"\" + key + \"\\\". \" +\n            \"Note that HTML attributes are case-insensitive and camelCased \" +\n            \"props need to use their kebab-case equivalents when using in-DOM \" +\n            \"templates. You should probably use \\\"\" + altKey + \"\\\" instead of \\\"\" + key + \"\\\".\"\n          );\n        }\n      }\n      checkProp(res, props, key, altKey, true) ||\n      checkProp(res, attrs, key, altKey, false);\n    }\n  }\n  return res\n}\n\nfunction checkProp (\n  res,\n  hash,\n  key,\n  altKey,\n  preserve\n) {\n  if (isDef(hash)) {\n    if (hasOwn(hash, key)) {\n      res[key] = hash[key];\n      if (!preserve) {\n        delete hash[key];\n      }\n      return true\n    } else if (hasOwn(hash, altKey)) {\n      res[key] = hash[altKey];\n      if (!preserve) {\n        delete hash[altKey];\n      }\n      return true\n    }\n  }\n  return false\n}\n\n/*  */\n\n// The template compiler attempts to minimize the need for normalization by\n// statically analyzing the template at compile time.\n//\n// For plain HTML markup, normalization can be completely skipped because the\n// generated render function is guaranteed to return Array<VNode>. There are\n// two cases where extra normalization is needed:\n\n// 1. When the children contains components - because a functional component\n// may return an Array instead of a single root. In this case, just a simple\n// normalization is needed - if any child is an Array, we flatten the whole\n// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep\n// because functional components already normalize their own children.\nfunction simpleNormalizeChildren (children) {\n  for (var i = 0; i < children.length; i++) {\n    if (Array.isArray(children[i])) {\n      return Array.prototype.concat.apply([], children)\n    }\n  }\n  return children\n}\n\n// 2. When the children contains constructs that always generated nested Arrays,\n// e.g. <template>, <slot>, v-for, or when the children is provided by user\n// with hand-written render functions / JSX. In such cases a full normalization\n// is needed to cater to all possible types of children values.\nfunction normalizeChildren (children) {\n  return isPrimitive(children)\n    ? [createTextVNode(children)]\n    : Array.isArray(children)\n      ? normalizeArrayChildren(children)\n      : undefined\n}\n\nfunction isTextNode (node) {\n  return isDef(node) && isDef(node.text) && isFalse(node.isComment)\n}\n\nfunction normalizeArrayChildren (children, nestedIndex) {\n  var res = [];\n  var i, c, lastIndex, last;\n  for (i = 0; i < children.length; i++) {\n    c = children[i];\n    if (isUndef(c) || typeof c === 'boolean') { continue }\n    lastIndex = res.length - 1;\n    last = res[lastIndex];\n    //  nested\n    if (Array.isArray(c)) {\n      if (c.length > 0) {\n        c = normalizeArrayChildren(c, ((nestedIndex || '') + \"_\" + i));\n        // merge adjacent text nodes\n        if (isTextNode(c[0]) && isTextNode(last)) {\n          res[lastIndex] = createTextVNode(last.text + (c[0]).text);\n          c.shift();\n        }\n        res.push.apply(res, c);\n      }\n    } else if (isPrimitive(c)) {\n      if (isTextNode(last)) {\n        // merge adjacent text nodes\n        // this is necessary for SSR hydration because text nodes are\n        // essentially merged when rendered to HTML strings\n        res[lastIndex] = createTextVNode(last.text + c);\n      } else if (c !== '') {\n        // convert primitive to vnode\n        res.push(createTextVNode(c));\n      }\n    } else {\n      if (isTextNode(c) && isTextNode(last)) {\n        // merge adjacent text nodes\n        res[lastIndex] = createTextVNode(last.text + c.text);\n      } else {\n        // default key for nested array children (likely generated by v-for)\n        if (isTrue(children._isVList) &&\n          isDef(c.tag) &&\n          isUndef(c.key) &&\n          isDef(nestedIndex)) {\n          c.key = \"__vlist\" + nestedIndex + \"_\" + i + \"__\";\n        }\n        res.push(c);\n      }\n    }\n  }\n  return res\n}\n\n/*  */\n\nfunction initProvide (vm) {\n  var provide = vm.$options.provide;\n  if (provide) {\n    vm._provided = typeof provide === 'function'\n      ? provide.call(vm)\n      : provide;\n  }\n}\n\nfunction initInjections (vm) {\n  var result = resolveInject(vm.$options.inject, vm);\n  if (result) {\n    toggleObserving(false);\n    Object.keys(result).forEach(function (key) {\n      /* istanbul ignore else */\n      if (true) {\n        defineReactive$$1(vm, key, result[key], function () {\n          warn(\n            \"Avoid mutating an injected value directly since the changes will be \" +\n            \"overwritten whenever the provided component re-renders. \" +\n            \"injection being mutated: \\\"\" + key + \"\\\"\",\n            vm\n          );\n        });\n      } else {}\n    });\n    toggleObserving(true);\n  }\n}\n\nfunction resolveInject (inject, vm) {\n  if (inject) {\n    // inject is :any because flow is not smart enough to figure out cached\n    var result = Object.create(null);\n    var keys = hasSymbol\n      ? Reflect.ownKeys(inject)\n      : Object.keys(inject);\n\n    for (var i = 0; i < keys.length; i++) {\n      var key = keys[i];\n      // #6574 in case the inject object is observed...\n      if (key === '__ob__') { continue }\n      var provideKey = inject[key].from;\n      var source = vm;\n      while (source) {\n        if (source._provided && hasOwn(source._provided, provideKey)) {\n          result[key] = source._provided[provideKey];\n          break\n        }\n        source = source.$parent;\n      }\n      if (!source) {\n        if ('default' in inject[key]) {\n          var provideDefault = inject[key].default;\n          result[key] = typeof provideDefault === 'function'\n            ? provideDefault.call(vm)\n            : provideDefault;\n        } else if (true) {\n          warn((\"Injection \\\"\" + key + \"\\\" not found\"), vm);\n        }\n      }\n    }\n    return result\n  }\n}\n\n/*  */\n\n\n\n/**\n * Runtime helper for resolving raw children VNodes into a slot object.\n */\nfunction resolveSlots (\n  children,\n  context\n) {\n  if (!children || !children.length) {\n    return {}\n  }\n  var slots = {};\n  for (var i = 0, l = children.length; i < l; i++) {\n    var child = children[i];\n    var data = child.data;\n    // remove slot attribute if the node is resolved as a Vue slot node\n    if (data && data.attrs && data.attrs.slot) {\n      delete data.attrs.slot;\n    }\n    // named slots should only be respected if the vnode was rendered in the\n    // same context.\n    if ((child.context === context || child.fnContext === context) &&\n      data && data.slot != null\n    ) {\n      var name = data.slot;\n      var slot = (slots[name] || (slots[name] = []));\n      if (child.tag === 'template') {\n        slot.push.apply(slot, child.children || []);\n      } else {\n        slot.push(child);\n      }\n    } else {\n      (slots.default || (slots.default = [])).push(child);\n    }\n  }\n  // ignore slots that contains only whitespace\n  for (var name$1 in slots) {\n    if (slots[name$1].every(isWhitespace)) {\n      delete slots[name$1];\n    }\n  }\n  return slots\n}\n\nfunction isWhitespace (node) {\n  return (node.isComment && !node.asyncFactory) || node.text === ' '\n}\n\n/*  */\n\nfunction normalizeScopedSlots (\n  slots,\n  normalSlots,\n  prevSlots\n) {\n  var res;\n  var hasNormalSlots = Object.keys(normalSlots).length > 0;\n  var isStable = slots ? !!slots.$stable : !hasNormalSlots;\n  var key = slots && slots.$key;\n  if (!slots) {\n    res = {};\n  } else if (slots._normalized) {\n    // fast path 1: child component re-render only, parent did not change\n    return slots._normalized\n  } else if (\n    isStable &&\n    prevSlots &&\n    prevSlots !== emptyObject &&\n    key === prevSlots.$key &&\n    !hasNormalSlots &&\n    !prevSlots.$hasNormal\n  ) {\n    // fast path 2: stable scoped slots w/ no normal slots to proxy,\n    // only need to normalize once\n    return prevSlots\n  } else {\n    res = {};\n    for (var key$1 in slots) {\n      if (slots[key$1] && key$1[0] !== '$') {\n        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);\n      }\n    }\n  }\n  // expose normal slots on scopedSlots\n  for (var key$2 in normalSlots) {\n    if (!(key$2 in res)) {\n      res[key$2] = proxyNormalSlot(normalSlots, key$2);\n    }\n  }\n  // avoriaz seems to mock a non-extensible $scopedSlots object\n  // and when that is passed down this would cause an error\n  if (slots && Object.isExtensible(slots)) {\n    (slots)._normalized = res;\n  }\n  def(res, '$stable', isStable);\n  def(res, '$key', key);\n  def(res, '$hasNormal', hasNormalSlots);\n  return res\n}\n\nfunction normalizeScopedSlot(normalSlots, key, fn) {\n  var normalized = function () {\n    var res = arguments.length ? fn.apply(null, arguments) : fn({});\n    res = res && typeof res === 'object' && !Array.isArray(res)\n      ? [res] // single vnode\n      : normalizeChildren(res);\n    return res && (\n      res.length === 0 ||\n      (res.length === 1 && res[0].isComment) // #9658\n    ) ? undefined\n      : res\n  };\n  // this is a slot using the new v-slot syntax without scope. although it is\n  // compiled as a scoped slot, render fn users would expect it to be present\n  // on this.$slots because the usage is semantically a normal slot.\n  if (fn.proxy) {\n    Object.defineProperty(normalSlots, key, {\n      get: normalized,\n      enumerable: true,\n      configurable: true\n    });\n  }\n  return normalized\n}\n\nfunction proxyNormalSlot(slots, key) {\n  return function () { return slots[key]; }\n}\n\n/*  */\n\n/**\n * Runtime helper for rendering v-for lists.\n */\nfunction renderList (\n  val,\n  render\n) {\n  var ret, i, l, keys, key;\n  if (Array.isArray(val) || typeof val === 'string') {\n    ret = new Array(val.length);\n    for (i = 0, l = val.length; i < l; i++) {\n      ret[i] = render(val[i], i);\n    }\n  } else if (typeof val === 'number') {\n    ret = new Array(val);\n    for (i = 0; i < val; i++) {\n      ret[i] = render(i + 1, i);\n    }\n  } else if (isObject(val)) {\n    if (hasSymbol && val[Symbol.iterator]) {\n      ret = [];\n      var iterator = val[Symbol.iterator]();\n      var result = iterator.next();\n      while (!result.done) {\n        ret.push(render(result.value, ret.length));\n        result = iterator.next();\n      }\n    } else {\n      keys = Object.keys(val);\n      ret = new Array(keys.length);\n      for (i = 0, l = keys.length; i < l; i++) {\n        key = keys[i];\n        ret[i] = render(val[key], key, i);\n      }\n    }\n  }\n  if (!isDef(ret)) {\n    ret = [];\n  }\n  (ret)._isVList = true;\n  return ret\n}\n\n/*  */\n\n/**\n * Runtime helper for rendering <slot>\n */\nfunction renderSlot (\n  name,\n  fallback,\n  props,\n  bindObject\n) {\n  var scopedSlotFn = this.$scopedSlots[name];\n  var nodes;\n  if (scopedSlotFn) { // scoped slot\n    props = props || {};\n    if (bindObject) {\n      if ( true && !isObject(bindObject)) {\n        warn(\n          'slot v-bind without argument expects an Object',\n          this\n        );\n      }\n      props = extend(extend({}, bindObject), props);\n    }\n    nodes = scopedSlotFn(props) || fallback;\n  } else {\n    nodes = this.$slots[name] || fallback;\n  }\n\n  var target = props && props.slot;\n  if (target) {\n    return this.$createElement('template', { slot: target }, nodes)\n  } else {\n    return nodes\n  }\n}\n\n/*  */\n\n/**\n * Runtime helper for resolving filters\n */\nfunction resolveFilter (id) {\n  return resolveAsset(this.$options, 'filters', id, true) || identity\n}\n\n/*  */\n\nfunction isKeyNotMatch (expect, actual) {\n  if (Array.isArray(expect)) {\n    return expect.indexOf(actual) === -1\n  } else {\n    return expect !== actual\n  }\n}\n\n/**\n * Runtime helper for checking keyCodes from config.\n * exposed as Vue.prototype._k\n * passing in eventKeyName as last argument separately for backwards compat\n */\nfunction checkKeyCodes (\n  eventKeyCode,\n  key,\n  builtInKeyCode,\n  eventKeyName,\n  builtInKeyName\n) {\n  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;\n  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {\n    return isKeyNotMatch(builtInKeyName, eventKeyName)\n  } else if (mappedKeyCode) {\n    return isKeyNotMatch(mappedKeyCode, eventKeyCode)\n  } else if (eventKeyName) {\n    return hyphenate(eventKeyName) !== key\n  }\n}\n\n/*  */\n\n/**\n * Runtime helper for merging v-bind=\"object\" into a VNode's data.\n */\nfunction bindObjectProps (\n  data,\n  tag,\n  value,\n  asProp,\n  isSync\n) {\n  if (value) {\n    if (!isObject(value)) {\n       true && warn(\n        'v-bind without argument expects an Object or Array value',\n        this\n      );\n    } else {\n      if (Array.isArray(value)) {\n        value = toObject(value);\n      }\n      var hash;\n      var loop = function ( key ) {\n        if (\n          key === 'class' ||\n          key === 'style' ||\n          isReservedAttribute(key)\n        ) {\n          hash = data;\n        } else {\n          var type = data.attrs && data.attrs.type;\n          hash = asProp || config.mustUseProp(tag, type, key)\n            ? data.domProps || (data.domProps = {})\n            : data.attrs || (data.attrs = {});\n        }\n        var camelizedKey = camelize(key);\n        var hyphenatedKey = hyphenate(key);\n        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {\n          hash[key] = value[key];\n\n          if (isSync) {\n            var on = data.on || (data.on = {});\n            on[(\"update:\" + key)] = function ($event) {\n              value[key] = $event;\n            };\n          }\n        }\n      };\n\n      for (var key in value) loop( key );\n    }\n  }\n  return data\n}\n\n/*  */\n\n/**\n * Runtime helper for rendering static trees.\n */\nfunction renderStatic (\n  index,\n  isInFor\n) {\n  var cached = this._staticTrees || (this._staticTrees = []);\n  var tree = cached[index];\n  // if has already-rendered static tree and not inside v-for,\n  // we can reuse the same tree.\n  if (tree && !isInFor) {\n    return tree\n  }\n  // otherwise, render a fresh tree.\n  tree = cached[index] = this.$options.staticRenderFns[index].call(\n    this._renderProxy,\n    null,\n    this // for render fns generated for functional component templates\n  );\n  markStatic(tree, (\"__static__\" + index), false);\n  return tree\n}\n\n/**\n * Runtime helper for v-once.\n * Effectively it means marking the node as static with a unique key.\n */\nfunction markOnce (\n  tree,\n  index,\n  key\n) {\n  markStatic(tree, (\"__once__\" + index + (key ? (\"_\" + key) : \"\")), true);\n  return tree\n}\n\nfunction markStatic (\n  tree,\n  key,\n  isOnce\n) {\n  if (Array.isArray(tree)) {\n    for (var i = 0; i < tree.length; i++) {\n      if (tree[i] && typeof tree[i] !== 'string') {\n        markStaticNode(tree[i], (key + \"_\" + i), isOnce);\n      }\n    }\n  } else {\n    markStaticNode(tree, key, isOnce);\n  }\n}\n\nfunction markStaticNode (node, key, isOnce) {\n  node.isStatic = true;\n  node.key = key;\n  node.isOnce = isOnce;\n}\n\n/*  */\n\nfunction bindObjectListeners (data, value) {\n  if (value) {\n    if (!isPlainObject(value)) {\n       true && warn(\n        'v-on without argument expects an Object value',\n        this\n      );\n    } else {\n      var on = data.on = data.on ? extend({}, data.on) : {};\n      for (var key in value) {\n        var existing = on[key];\n        var ours = value[key];\n        on[key] = existing ? [].concat(existing, ours) : ours;\n      }\n    }\n  }\n  return data\n}\n\n/*  */\n\nfunction resolveScopedSlots (\n  fns, // see flow/vnode\n  res,\n  // the following are added in 2.6\n  hasDynamicKeys,\n  contentHashKey\n) {\n  res = res || { $stable: !hasDynamicKeys };\n  for (var i = 0; i < fns.length; i++) {\n    var slot = fns[i];\n    if (Array.isArray(slot)) {\n      resolveScopedSlots(slot, res, hasDynamicKeys);\n    } else if (slot) {\n      // marker for reverse proxying v-slot without scope on this.$slots\n      if (slot.proxy) {\n        slot.fn.proxy = true;\n      }\n      res[slot.key] = slot.fn;\n    }\n  }\n  if (contentHashKey) {\n    (res).$key = contentHashKey;\n  }\n  return res\n}\n\n/*  */\n\nfunction bindDynamicKeys (baseObj, values) {\n  for (var i = 0; i < values.length; i += 2) {\n    var key = values[i];\n    if (typeof key === 'string' && key) {\n      baseObj[values[i]] = values[i + 1];\n    } else if ( true && key !== '' && key !== null) {\n      // null is a speical value for explicitly removing a binding\n      warn(\n        (\"Invalid value for dynamic directive argument (expected string or null): \" + key),\n        this\n      );\n    }\n  }\n  return baseObj\n}\n\n// helper to dynamically append modifier runtime markers to event names.\n// ensure only append when value is already string, otherwise it will be cast\n// to string and cause the type check to miss.\nfunction prependModifier (value, symbol) {\n  return typeof value === 'string' ? symbol + value : value\n}\n\n/*  */\n\nfunction installRenderHelpers (target) {\n  target._o = markOnce;\n  target._n = toNumber;\n  target._s = toString;\n  target._l = renderList;\n  target._t = renderSlot;\n  target._q = looseEqual;\n  target._i = looseIndexOf;\n  target._m = renderStatic;\n  target._f = resolveFilter;\n  target._k = checkKeyCodes;\n  target._b = bindObjectProps;\n  target._v = createTextVNode;\n  target._e = createEmptyVNode;\n  target._u = resolveScopedSlots;\n  target._g = bindObjectListeners;\n  target._d = bindDynamicKeys;\n  target._p = prependModifier;\n}\n\n/*  */\n\nfunction FunctionalRenderContext (\n  data,\n  props,\n  children,\n  parent,\n  Ctor\n) {\n  var this$1 = this;\n\n  var options = Ctor.options;\n  // ensure the createElement function in functional components\n  // gets a unique context - this is necessary for correct named slot check\n  var contextVm;\n  if (hasOwn(parent, '_uid')) {\n    contextVm = Object.create(parent);\n    // $flow-disable-line\n    contextVm._original = parent;\n  } else {\n    // the context vm passed in is a functional context as well.\n    // in this case we want to make sure we are able to get a hold to the\n    // real context instance.\n    contextVm = parent;\n    // $flow-disable-line\n    parent = parent._original;\n  }\n  var isCompiled = isTrue(options._compiled);\n  var needNormalization = !isCompiled;\n\n  this.data = data;\n  this.props = props;\n  this.children = children;\n  this.parent = parent;\n  this.listeners = data.on || emptyObject;\n  this.injections = resolveInject(options.inject, parent);\n  this.slots = function () {\n    if (!this$1.$slots) {\n      normalizeScopedSlots(\n        data.scopedSlots,\n        this$1.$slots = resolveSlots(children, parent)\n      );\n    }\n    return this$1.$slots\n  };\n\n  Object.defineProperty(this, 'scopedSlots', ({\n    enumerable: true,\n    get: function get () {\n      return normalizeScopedSlots(data.scopedSlots, this.slots())\n    }\n  }));\n\n  // support for compiled functional template\n  if (isCompiled) {\n    // exposing $options for renderStatic()\n    this.$options = options;\n    // pre-resolve slots for renderSlot()\n    this.$slots = this.slots();\n    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);\n  }\n\n  if (options._scopeId) {\n    this._c = function (a, b, c, d) {\n      var vnode = createElement(contextVm, a, b, c, d, needNormalization);\n      if (vnode && !Array.isArray(vnode)) {\n        vnode.fnScopeId = options._scopeId;\n        vnode.fnContext = parent;\n      }\n      return vnode\n    };\n  } else {\n    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };\n  }\n}\n\ninstallRenderHelpers(FunctionalRenderContext.prototype);\n\nfunction createFunctionalComponent (\n  Ctor,\n  propsData,\n  data,\n  contextVm,\n  children\n) {\n  var options = Ctor.options;\n  var props = {};\n  var propOptions = options.props;\n  if (isDef(propOptions)) {\n    for (var key in propOptions) {\n      props[key] = validateProp(key, propOptions, propsData || emptyObject);\n    }\n  } else {\n    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }\n    if (isDef(data.props)) { mergeProps(props, data.props); }\n  }\n\n  var renderContext = new FunctionalRenderContext(\n    data,\n    props,\n    children,\n    contextVm,\n    Ctor\n  );\n\n  var vnode = options.render.call(null, renderContext._c, renderContext);\n\n  if (vnode instanceof VNode) {\n    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)\n  } else if (Array.isArray(vnode)) {\n    var vnodes = normalizeChildren(vnode) || [];\n    var res = new Array(vnodes.length);\n    for (var i = 0; i < vnodes.length; i++) {\n      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);\n    }\n    return res\n  }\n}\n\nfunction cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {\n  // #7817 clone node before setting fnContext, otherwise if the node is reused\n  // (e.g. it was from a cached normal slot) the fnContext causes named slots\n  // that should not be matched to match.\n  var clone = cloneVNode(vnode);\n  clone.fnContext = contextVm;\n  clone.fnOptions = options;\n  if (true) {\n    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;\n  }\n  if (data.slot) {\n    (clone.data || (clone.data = {})).slot = data.slot;\n  }\n  return clone\n}\n\nfunction mergeProps (to, from) {\n  for (var key in from) {\n    to[camelize(key)] = from[key];\n  }\n}\n\n/*  */\n\n/*  */\n\n/*  */\n\n/*  */\n\n// inline hooks to be invoked on component VNodes during patch\nvar componentVNodeHooks = {\n  init: function init (vnode, hydrating) {\n    if (\n      vnode.componentInstance &&\n      !vnode.componentInstance._isDestroyed &&\n      vnode.data.keepAlive\n    ) {\n      // kept-alive components, treat as a patch\n      var mountedNode = vnode; // work around flow\n      componentVNodeHooks.prepatch(mountedNode, mountedNode);\n    } else {\n      var child = vnode.componentInstance = createComponentInstanceForVnode(\n        vnode,\n        activeInstance\n      );\n      child.$mount(hydrating ? vnode.elm : undefined, hydrating);\n    }\n  },\n\n  prepatch: function prepatch (oldVnode, vnode) {\n    var options = vnode.componentOptions;\n    var child = vnode.componentInstance = oldVnode.componentInstance;\n    updateChildComponent(\n      child,\n      options.propsData, // updated props\n      options.listeners, // updated listeners\n      vnode, // new parent vnode\n      options.children // new children\n    );\n  },\n\n  insert: function insert (vnode) {\n    var context = vnode.context;\n    var componentInstance = vnode.componentInstance;\n    if (!componentInstance._isMounted) {\n      componentInstance._isMounted = true;\n      callHook(componentInstance, 'mounted');\n    }\n    if (vnode.data.keepAlive) {\n      if (context._isMounted) {\n        // vue-router#1212\n        // During updates, a kept-alive component's child components may\n        // change, so directly walking the tree here may call activated hooks\n        // on incorrect children. Instead we push them into a queue which will\n        // be processed after the whole patch process ended.\n        queueActivatedComponent(componentInstance);\n      } else {\n        activateChildComponent(componentInstance, true /* direct */);\n      }\n    }\n  },\n\n  destroy: function destroy (vnode) {\n    var componentInstance = vnode.componentInstance;\n    if (!componentInstance._isDestroyed) {\n      if (!vnode.data.keepAlive) {\n        componentInstance.$destroy();\n      } else {\n        deactivateChildComponent(componentInstance, true /* direct */);\n      }\n    }\n  }\n};\n\nvar hooksToMerge = Object.keys(componentVNodeHooks);\n\nfunction createComponent (\n  Ctor,\n  data,\n  context,\n  children,\n  tag\n) {\n  if (isUndef(Ctor)) {\n    return\n  }\n\n  var baseCtor = context.$options._base;\n\n  // plain options object: turn it into a constructor\n  if (isObject(Ctor)) {\n    Ctor = baseCtor.extend(Ctor);\n  }\n\n  // if at this stage it's not a constructor or an async component factory,\n  // reject.\n  if (typeof Ctor !== 'function') {\n    if (true) {\n      warn((\"Invalid Component definition: \" + (String(Ctor))), context);\n    }\n    return\n  }\n\n  // async component\n  var asyncFactory;\n  if (isUndef(Ctor.cid)) {\n    asyncFactory = Ctor;\n    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);\n    if (Ctor === undefined) {\n      // return a placeholder node for async component, which is rendered\n      // as a comment node but preserves all the raw information for the node.\n      // the information will be used for async server-rendering and hydration.\n      return createAsyncPlaceholder(\n        asyncFactory,\n        data,\n        context,\n        children,\n        tag\n      )\n    }\n  }\n\n  data = data || {};\n\n  // resolve constructor options in case global mixins are applied after\n  // component constructor creation\n  resolveConstructorOptions(Ctor);\n\n  // transform component v-model data into props & events\n  if (isDef(data.model)) {\n    transformModel(Ctor.options, data);\n  }\n\n  // extract props\n  var propsData = extractPropsFromVNodeData(data, Ctor, tag);\n\n  // functional component\n  if (isTrue(Ctor.options.functional)) {\n    return createFunctionalComponent(Ctor, propsData, data, context, children)\n  }\n\n  // extract listeners, since these needs to be treated as\n  // child component listeners instead of DOM listeners\n  var listeners = data.on;\n  // replace with listeners with .native modifier\n  // so it gets processed during parent component patch.\n  data.on = data.nativeOn;\n\n  if (isTrue(Ctor.options.abstract)) {\n    // abstract components do not keep anything\n    // other than props & listeners & slot\n\n    // work around flow\n    var slot = data.slot;\n    data = {};\n    if (slot) {\n      data.slot = slot;\n    }\n  }\n\n  // install component management hooks onto the placeholder node\n  installComponentHooks(data);\n\n  // return a placeholder vnode\n  var name = Ctor.options.name || tag;\n  var vnode = new VNode(\n    (\"vue-component-\" + (Ctor.cid) + (name ? (\"-\" + name) : '')),\n    data, undefined, undefined, undefined, context,\n    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },\n    asyncFactory\n  );\n\n  return vnode\n}\n\nfunction createComponentInstanceForVnode (\n  vnode, // we know it's MountedComponentVNode but flow doesn't\n  parent // activeInstance in lifecycle state\n) {\n  var options = {\n    _isComponent: true,\n    _parentVnode: vnode,\n    parent: parent\n  };\n  // check inline-template render functions\n  var inlineTemplate = vnode.data.inlineTemplate;\n  if (isDef(inlineTemplate)) {\n    options.render = inlineTemplate.render;\n    options.staticRenderFns = inlineTemplate.staticRenderFns;\n  }\n  return new vnode.componentOptions.Ctor(options)\n}\n\nfunction installComponentHooks (data) {\n  var hooks = data.hook || (data.hook = {});\n  for (var i = 0; i < hooksToMerge.length; i++) {\n    var key = hooksToMerge[i];\n    var existing = hooks[key];\n    var toMerge = componentVNodeHooks[key];\n    if (existing !== toMerge && !(existing && existing._merged)) {\n      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;\n    }\n  }\n}\n\nfunction mergeHook$1 (f1, f2) {\n  var merged = function (a, b) {\n    // flow complains about extra args which is why we use any\n    f1(a, b);\n    f2(a, b);\n  };\n  merged._merged = true;\n  return merged\n}\n\n// transform component v-model info (value and callback) into\n// prop and event handler respectively.\nfunction transformModel (options, data) {\n  var prop = (options.model && options.model.prop) || 'value';\n  var event = (options.model && options.model.event) || 'input'\n  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;\n  var on = data.on || (data.on = {});\n  var existing = on[event];\n  var callback = data.model.callback;\n  if (isDef(existing)) {\n    if (\n      Array.isArray(existing)\n        ? existing.indexOf(callback) === -1\n        : existing !== callback\n    ) {\n      on[event] = [callback].concat(existing);\n    }\n  } else {\n    on[event] = callback;\n  }\n}\n\n/*  */\n\nvar SIMPLE_NORMALIZE = 1;\nvar ALWAYS_NORMALIZE = 2;\n\n// wrapper function for providing a more flexible interface\n// without getting yelled at by flow\nfunction createElement (\n  context,\n  tag,\n  data,\n  children,\n  normalizationType,\n  alwaysNormalize\n) {\n  if (Array.isArray(data) || isPrimitive(data)) {\n    normalizationType = children;\n    children = data;\n    data = undefined;\n  }\n  if (isTrue(alwaysNormalize)) {\n    normalizationType = ALWAYS_NORMALIZE;\n  }\n  return _createElement(context, tag, data, children, normalizationType)\n}\n\nfunction _createElement (\n  context,\n  tag,\n  data,\n  children,\n  normalizationType\n) {\n  if (isDef(data) && isDef((data).__ob__)) {\n     true && warn(\n      \"Avoid using observed data object as vnode data: \" + (JSON.stringify(data)) + \"\\n\" +\n      'Always create fresh vnode data objects in each render!',\n      context\n    );\n    return createEmptyVNode()\n  }\n  // object syntax in v-bind\n  if (isDef(data) && isDef(data.is)) {\n    tag = data.is;\n  }\n  if (!tag) {\n    // in case of component :is set to falsy value\n    return createEmptyVNode()\n  }\n  // warn against non-primitive key\n  if ( true &&\n    isDef(data) && isDef(data.key) && !isPrimitive(data.key)\n  ) {\n    {\n      warn(\n        'Avoid using non-primitive value as key, ' +\n        'use string/number value instead.',\n        context\n      );\n    }\n  }\n  // support single function children as default scoped slot\n  if (Array.isArray(children) &&\n    typeof children[0] === 'function'\n  ) {\n    data = data || {};\n    data.scopedSlots = { default: children[0] };\n    children.length = 0;\n  }\n  if (normalizationType === ALWAYS_NORMALIZE) {\n    children = normalizeChildren(children);\n  } else if (normalizationType === SIMPLE_NORMALIZE) {\n    children = simpleNormalizeChildren(children);\n  }\n  var vnode, ns;\n  if (typeof tag === 'string') {\n    var Ctor;\n    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);\n    if (config.isReservedTag(tag)) {\n      // platform built-in elements\n      vnode = new VNode(\n        config.parsePlatformTagName(tag), data, children,\n        undefined, undefined, context\n      );\n    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {\n      // component\n      vnode = createComponent(Ctor, data, context, children, tag);\n    } else {\n      // unknown or unlisted namespaced elements\n      // check at runtime because it may get assigned a namespace when its\n      // parent normalizes children\n      vnode = new VNode(\n        tag, data, children,\n        undefined, undefined, context\n      );\n    }\n  } else {\n    // direct component options / constructor\n    vnode = createComponent(tag, data, context, children);\n  }\n  if (Array.isArray(vnode)) {\n    return vnode\n  } else if (isDef(vnode)) {\n    if (isDef(ns)) { applyNS(vnode, ns); }\n    if (isDef(data)) { registerDeepBindings(data); }\n    return vnode\n  } else {\n    return createEmptyVNode()\n  }\n}\n\nfunction applyNS (vnode, ns, force) {\n  vnode.ns = ns;\n  if (vnode.tag === 'foreignObject') {\n    // use default namespace inside foreignObject\n    ns = undefined;\n    force = true;\n  }\n  if (isDef(vnode.children)) {\n    for (var i = 0, l = vnode.children.length; i < l; i++) {\n      var child = vnode.children[i];\n      if (isDef(child.tag) && (\n        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {\n        applyNS(child, ns, force);\n      }\n    }\n  }\n}\n\n// ref #5318\n// necessary to ensure parent re-render when deep bindings like :style and\n// :class are used on slot nodes\nfunction registerDeepBindings (data) {\n  if (isObject(data.style)) {\n    traverse(data.style);\n  }\n  if (isObject(data.class)) {\n    traverse(data.class);\n  }\n}\n\n/*  */\n\nfunction initRender (vm) {\n  vm._vnode = null; // the root of the child tree\n  vm._staticTrees = null; // v-once cached trees\n  var options = vm.$options;\n  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree\n  var renderContext = parentVnode && parentVnode.context;\n  vm.$slots = resolveSlots(options._renderChildren, renderContext);\n  vm.$scopedSlots = emptyObject;\n  // bind the createElement fn to this instance\n  // so that we get proper render context inside it.\n  // args order: tag, data, children, normalizationType, alwaysNormalize\n  // internal version is used by render functions compiled from templates\n  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };\n  // normalization is always applied for the public version, used in\n  // user-written render functions.\n  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };\n\n  // $attrs & $listeners are exposed for easier HOC creation.\n  // they need to be reactive so that HOCs using them are always updated\n  var parentData = parentVnode && parentVnode.data;\n\n  /* istanbul ignore else */\n  if (true) {\n    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {\n      !isUpdatingChildComponent && warn(\"$attrs is readonly.\", vm);\n    }, true);\n    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {\n      !isUpdatingChildComponent && warn(\"$listeners is readonly.\", vm);\n    }, true);\n  } else {}\n}\n\nvar currentRenderingInstance = null;\n\nfunction renderMixin (Vue) {\n  // install runtime convenience helpers\n  installRenderHelpers(Vue.prototype);\n\n  Vue.prototype.$nextTick = function (fn) {\n    return nextTick(fn, this)\n  };\n\n  Vue.prototype._render = function () {\n    var vm = this;\n    var ref = vm.$options;\n    var render = ref.render;\n    var _parentVnode = ref._parentVnode;\n\n    if (_parentVnode) {\n      vm.$scopedSlots = normalizeScopedSlots(\n        _parentVnode.data.scopedSlots,\n        vm.$slots,\n        vm.$scopedSlots\n      );\n    }\n\n    // set parent vnode. this allows render functions to have access\n    // to the data on the placeholder node.\n    vm.$vnode = _parentVnode;\n    // render self\n    var vnode;\n    try {\n      // There's no need to maintain a stack becaues all render fns are called\n      // separately from one another. Nested component's render fns are called\n      // when parent component is patched.\n      currentRenderingInstance = vm;\n      vnode = render.call(vm._renderProxy, vm.$createElement);\n    } catch (e) {\n      handleError(e, vm, \"render\");\n      // return error render result,\n      // or previous vnode to prevent render error causing blank component\n      /* istanbul ignore else */\n      if ( true && vm.$options.renderError) {\n        try {\n          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);\n        } catch (e) {\n          handleError(e, vm, \"renderError\");\n          vnode = vm._vnode;\n        }\n      } else {\n        vnode = vm._vnode;\n      }\n    } finally {\n      currentRenderingInstance = null;\n    }\n    // if the returned array contains only a single node, allow it\n    if (Array.isArray(vnode) && vnode.length === 1) {\n      vnode = vnode[0];\n    }\n    // return empty vnode in case the render function errored out\n    if (!(vnode instanceof VNode)) {\n      if ( true && Array.isArray(vnode)) {\n        warn(\n          'Multiple root nodes returned from render function. Render function ' +\n          'should return a single root node.',\n          vm\n        );\n      }\n      vnode = createEmptyVNode();\n    }\n    // set parent\n    vnode.parent = _parentVnode;\n    return vnode\n  };\n}\n\n/*  */\n\nfunction ensureCtor (comp, base) {\n  if (\n    comp.__esModule ||\n    (hasSymbol && comp[Symbol.toStringTag] === 'Module')\n  ) {\n    comp = comp.default;\n  }\n  return isObject(comp)\n    ? base.extend(comp)\n    : comp\n}\n\nfunction createAsyncPlaceholder (\n  factory,\n  data,\n  context,\n  children,\n  tag\n) {\n  var node = createEmptyVNode();\n  node.asyncFactory = factory;\n  node.asyncMeta = { data: data, context: context, children: children, tag: tag };\n  return node\n}\n\nfunction resolveAsyncComponent (\n  factory,\n  baseCtor\n) {\n  if (isTrue(factory.error) && isDef(factory.errorComp)) {\n    return factory.errorComp\n  }\n\n  if (isDef(factory.resolved)) {\n    return factory.resolved\n  }\n\n  var owner = currentRenderingInstance;\n  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {\n    // already pending\n    factory.owners.push(owner);\n  }\n\n  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {\n    return factory.loadingComp\n  }\n\n  if (owner && !isDef(factory.owners)) {\n    var owners = factory.owners = [owner];\n    var sync = true;\n    var timerLoading = null;\n    var timerTimeout = null\n\n    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });\n\n    var forceRender = function (renderCompleted) {\n      for (var i = 0, l = owners.length; i < l; i++) {\n        (owners[i]).$forceUpdate();\n      }\n\n      if (renderCompleted) {\n        owners.length = 0;\n        if (timerLoading !== null) {\n          clearTimeout(timerLoading);\n          timerLoading = null;\n        }\n        if (timerTimeout !== null) {\n          clearTimeout(timerTimeout);\n          timerTimeout = null;\n        }\n      }\n    };\n\n    var resolve = once(function (res) {\n      // cache resolved\n      factory.resolved = ensureCtor(res, baseCtor);\n      // invoke callbacks only if this is not a synchronous resolve\n      // (async resolves are shimmed as synchronous during SSR)\n      if (!sync) {\n        forceRender(true);\n      } else {\n        owners.length = 0;\n      }\n    });\n\n    var reject = once(function (reason) {\n       true && warn(\n        \"Failed to resolve async component: \" + (String(factory)) +\n        (reason ? (\"\\nReason: \" + reason) : '')\n      );\n      if (isDef(factory.errorComp)) {\n        factory.error = true;\n        forceRender(true);\n      }\n    });\n\n    var res = factory(resolve, reject);\n\n    if (isObject(res)) {\n      if (isPromise(res)) {\n        // () => Promise\n        if (isUndef(factory.resolved)) {\n          res.then(resolve, reject);\n        }\n      } else if (isPromise(res.component)) {\n        res.component.then(resolve, reject);\n\n        if (isDef(res.error)) {\n          factory.errorComp = ensureCtor(res.error, baseCtor);\n        }\n\n        if (isDef(res.loading)) {\n          factory.loadingComp = ensureCtor(res.loading, baseCtor);\n          if (res.delay === 0) {\n            factory.loading = true;\n          } else {\n            timerLoading = setTimeout(function () {\n              timerLoading = null;\n              if (isUndef(factory.resolved) && isUndef(factory.error)) {\n                factory.loading = true;\n                forceRender(false);\n              }\n            }, res.delay || 200);\n          }\n        }\n\n        if (isDef(res.timeout)) {\n          timerTimeout = setTimeout(function () {\n            timerTimeout = null;\n            if (isUndef(factory.resolved)) {\n              reject(\n                 true\n                  ? (\"timeout (\" + (res.timeout) + \"ms)\")\n                  : undefined\n              );\n            }\n          }, res.timeout);\n        }\n      }\n    }\n\n    sync = false;\n    // return in case resolved synchronously\n    return factory.loading\n      ? factory.loadingComp\n      : factory.resolved\n  }\n}\n\n/*  */\n\nfunction isAsyncPlaceholder (node) {\n  return node.isComment && node.asyncFactory\n}\n\n/*  */\n\nfunction getFirstComponentChild (children) {\n  if (Array.isArray(children)) {\n    for (var i = 0; i < children.length; i++) {\n      var c = children[i];\n      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {\n        return c\n      }\n    }\n  }\n}\n\n/*  */\n\n/*  */\n\nfunction initEvents (vm) {\n  vm._events = Object.create(null);\n  vm._hasHookEvent = false;\n  // init parent attached events\n  var listeners = vm.$options._parentListeners;\n  if (listeners) {\n    updateComponentListeners(vm, listeners);\n  }\n}\n\nvar target;\n\nfunction add (event, fn) {\n  target.$on(event, fn);\n}\n\nfunction remove$1 (event, fn) {\n  target.$off(event, fn);\n}\n\nfunction createOnceHandler (event, fn) {\n  var _target = target;\n  return function onceHandler () {\n    var res = fn.apply(null, arguments);\n    if (res !== null) {\n      _target.$off(event, onceHandler);\n    }\n  }\n}\n\nfunction updateComponentListeners (\n  vm,\n  listeners,\n  oldListeners\n) {\n  target = vm;\n  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);\n  target = undefined;\n}\n\nfunction eventsMixin (Vue) {\n  var hookRE = /^hook:/;\n  Vue.prototype.$on = function (event, fn) {\n    var vm = this;\n    if (Array.isArray(event)) {\n      for (var i = 0, l = event.length; i < l; i++) {\n        vm.$on(event[i], fn);\n      }\n    } else {\n      (vm._events[event] || (vm._events[event] = [])).push(fn);\n      // optimize hook:event cost by using a boolean flag marked at registration\n      // instead of a hash lookup\n      if (hookRE.test(event)) {\n        vm._hasHookEvent = true;\n      }\n    }\n    return vm\n  };\n\n  Vue.prototype.$once = function (event, fn) {\n    var vm = this;\n    function on () {\n      vm.$off(event, on);\n      fn.apply(vm, arguments);\n    }\n    on.fn = fn;\n    vm.$on(event, on);\n    return vm\n  };\n\n  Vue.prototype.$off = function (event, fn) {\n    var vm = this;\n    // all\n    if (!arguments.length) {\n      vm._events = Object.create(null);\n      return vm\n    }\n    // array of events\n    if (Array.isArray(event)) {\n      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {\n        vm.$off(event[i$1], fn);\n      }\n      return vm\n    }\n    // specific event\n    var cbs = vm._events[event];\n    if (!cbs) {\n      return vm\n    }\n    if (!fn) {\n      vm._events[event] = null;\n      return vm\n    }\n    // specific handler\n    var cb;\n    var i = cbs.length;\n    while (i--) {\n      cb = cbs[i];\n      if (cb === fn || cb.fn === fn) {\n        cbs.splice(i, 1);\n        break\n      }\n    }\n    return vm\n  };\n\n  Vue.prototype.$emit = function (event) {\n    var vm = this;\n    if (true) {\n      var lowerCaseEvent = event.toLowerCase();\n      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {\n        tip(\n          \"Event \\\"\" + lowerCaseEvent + \"\\\" is emitted in component \" +\n          (formatComponentName(vm)) + \" but the handler is registered for \\\"\" + event + \"\\\". \" +\n          \"Note that HTML attributes are case-insensitive and you cannot use \" +\n          \"v-on to listen to camelCase events when using in-DOM templates. \" +\n          \"You should probably use \\\"\" + (hyphenate(event)) + \"\\\" instead of \\\"\" + event + \"\\\".\"\n        );\n      }\n    }\n    var cbs = vm._events[event];\n    if (cbs) {\n      cbs = cbs.length > 1 ? toArray(cbs) : cbs;\n      var args = toArray(arguments, 1);\n      var info = \"event handler for \\\"\" + event + \"\\\"\";\n      for (var i = 0, l = cbs.length; i < l; i++) {\n        invokeWithErrorHandling(cbs[i], vm, args, vm, info);\n      }\n    }\n    return vm\n  };\n}\n\n/*  */\n\nvar activeInstance = null;\nvar isUpdatingChildComponent = false;\n\nfunction setActiveInstance(vm) {\n  var prevActiveInstance = activeInstance;\n  activeInstance = vm;\n  return function () {\n    activeInstance = prevActiveInstance;\n  }\n}\n\nfunction initLifecycle (vm) {\n  var options = vm.$options;\n\n  // locate first non-abstract parent\n  var parent = options.parent;\n  if (parent && !options.abstract) {\n    while (parent.$options.abstract && parent.$parent) {\n      parent = parent.$parent;\n    }\n    parent.$children.push(vm);\n  }\n\n  vm.$parent = parent;\n  vm.$root = parent ? parent.$root : vm;\n\n  vm.$children = [];\n  vm.$refs = {};\n\n  vm._watcher = null;\n  vm._inactive = null;\n  vm._directInactive = false;\n  vm._isMounted = false;\n  vm._isDestroyed = false;\n  vm._isBeingDestroyed = false;\n}\n\nfunction lifecycleMixin (Vue) {\n  Vue.prototype._update = function (vnode, hydrating) {\n    var vm = this;\n    var prevEl = vm.$el;\n    var prevVnode = vm._vnode;\n    var restoreActiveInstance = setActiveInstance(vm);\n    vm._vnode = vnode;\n    // Vue.prototype.__patch__ is injected in entry points\n    // based on the rendering backend used.\n    if (!prevVnode) {\n      // initial render\n      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);\n    } else {\n      // updates\n      vm.$el = vm.__patch__(prevVnode, vnode);\n    }\n    restoreActiveInstance();\n    // update __vue__ reference\n    if (prevEl) {\n      prevEl.__vue__ = null;\n    }\n    if (vm.$el) {\n      vm.$el.__vue__ = vm;\n    }\n    // if parent is an HOC, update its $el as well\n    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {\n      vm.$parent.$el = vm.$el;\n    }\n    // updated hook is called by the scheduler to ensure that children are\n    // updated in a parent's updated hook.\n  };\n\n  Vue.prototype.$forceUpdate = function () {\n    var vm = this;\n    if (vm._watcher) {\n      vm._watcher.update();\n    }\n  };\n\n  Vue.prototype.$destroy = function () {\n    var vm = this;\n    if (vm._isBeingDestroyed) {\n      return\n    }\n    callHook(vm, 'beforeDestroy');\n    vm._isBeingDestroyed = true;\n    // remove self from parent\n    var parent = vm.$parent;\n    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {\n      remove(parent.$children, vm);\n    }\n    // teardown watchers\n    if (vm._watcher) {\n      vm._watcher.teardown();\n    }\n    var i = vm._watchers.length;\n    while (i--) {\n      vm._watchers[i].teardown();\n    }\n    // remove reference from data ob\n    // frozen object may not have observer.\n    if (vm._data.__ob__) {\n      vm._data.__ob__.vmCount--;\n    }\n    // call the last hook...\n    vm._isDestroyed = true;\n    // invoke destroy hooks on current rendered tree\n    vm.__patch__(vm._vnode, null);\n    // fire destroyed hook\n    callHook(vm, 'destroyed');\n    // turn off all instance listeners.\n    vm.$off();\n    // remove __vue__ reference\n    if (vm.$el) {\n      vm.$el.__vue__ = null;\n    }\n    // release circular reference (#6759)\n    if (vm.$vnode) {\n      vm.$vnode.parent = null;\n    }\n  };\n}\n\nfunction mountComponent (\n  vm,\n  el,\n  hydrating\n) {\n  vm.$el = el;\n  if (!vm.$options.render) {\n    vm.$options.render = createEmptyVNode;\n    if (true) {\n      /* istanbul ignore if */\n      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||\n        vm.$options.el || el) {\n        warn(\n          'You are using the runtime-only build of Vue where the template ' +\n          'compiler is not available. Either pre-compile the templates into ' +\n          'render functions, or use the compiler-included build.',\n          vm\n        );\n      } else {\n        warn(\n          'Failed to mount component: template or render function not defined.',\n          vm\n        );\n      }\n    }\n  }\n  callHook(vm, 'beforeMount');\n\n  var updateComponent;\n  /* istanbul ignore if */\n  if ( true && config.performance && mark) {\n    updateComponent = function () {\n      var name = vm._name;\n      var id = vm._uid;\n      var startTag = \"vue-perf-start:\" + id;\n      var endTag = \"vue-perf-end:\" + id;\n\n      mark(startTag);\n      var vnode = vm._render();\n      mark(endTag);\n      measure((\"vue \" + name + \" render\"), startTag, endTag);\n\n      mark(startTag);\n      vm._update(vnode, hydrating);\n      mark(endTag);\n      measure((\"vue \" + name + \" patch\"), startTag, endTag);\n    };\n  } else {\n    updateComponent = function () {\n      vm._update(vm._render(), hydrating);\n    };\n  }\n\n  // we set this to vm._watcher inside the watcher's constructor\n  // since the watcher's initial patch may call $forceUpdate (e.g. inside child\n  // component's mounted hook), which relies on vm._watcher being already defined\n  new Watcher(vm, updateComponent, noop, {\n    before: function before () {\n      if (vm._isMounted && !vm._isDestroyed) {\n        callHook(vm, 'beforeUpdate');\n      }\n    }\n  }, true /* isRenderWatcher */);\n  hydrating = false;\n\n  // manually mounted instance, call mounted on self\n  // mounted is called for render-created child components in its inserted hook\n  if (vm.$vnode == null) {\n    vm._isMounted = true;\n    callHook(vm, 'mounted');\n  }\n  return vm\n}\n\nfunction updateChildComponent (\n  vm,\n  propsData,\n  listeners,\n  parentVnode,\n  renderChildren\n) {\n  if (true) {\n    isUpdatingChildComponent = true;\n  }\n\n  // determine whether component has slot children\n  // we need to do this before overwriting $options._renderChildren.\n\n  // check if there are dynamic scopedSlots (hand-written or compiled but with\n  // dynamic slot names). Static scoped slots compiled from template has the\n  // \"$stable\" marker.\n  var newScopedSlots = parentVnode.data.scopedSlots;\n  var oldScopedSlots = vm.$scopedSlots;\n  var hasDynamicScopedSlot = !!(\n    (newScopedSlots && !newScopedSlots.$stable) ||\n    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||\n    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)\n  );\n\n  // Any static slot children from the parent may have changed during parent's\n  // update. Dynamic scoped slots may also have changed. In such cases, a forced\n  // update is necessary to ensure correctness.\n  var needsForceUpdate = !!(\n    renderChildren ||               // has new static slots\n    vm.$options._renderChildren ||  // has old static slots\n    hasDynamicScopedSlot\n  );\n\n  vm.$options._parentVnode = parentVnode;\n  vm.$vnode = parentVnode; // update vm's placeholder node without re-render\n\n  if (vm._vnode) { // update child tree's parent\n    vm._vnode.parent = parentVnode;\n  }\n  vm.$options._renderChildren = renderChildren;\n\n  // update $attrs and $listeners hash\n  // these are also reactive so they may trigger child update if the child\n  // used them during render\n  vm.$attrs = parentVnode.data.attrs || emptyObject;\n  vm.$listeners = listeners || emptyObject;\n\n  // update props\n  if (propsData && vm.$options.props) {\n    toggleObserving(false);\n    var props = vm._props;\n    var propKeys = vm.$options._propKeys || [];\n    for (var i = 0; i < propKeys.length; i++) {\n      var key = propKeys[i];\n      var propOptions = vm.$options.props; // wtf flow?\n      props[key] = validateProp(key, propOptions, propsData, vm);\n    }\n    toggleObserving(true);\n    // keep a copy of raw propsData\n    vm.$options.propsData = propsData;\n  }\n\n  // update listeners\n  listeners = listeners || emptyObject;\n  var oldListeners = vm.$options._parentListeners;\n  vm.$options._parentListeners = listeners;\n  updateComponentListeners(vm, listeners, oldListeners);\n\n  // resolve slots + force update if has children\n  if (needsForceUpdate) {\n    vm.$slots = resolveSlots(renderChildren, parentVnode.context);\n    vm.$forceUpdate();\n  }\n\n  if (true) {\n    isUpdatingChildComponent = false;\n  }\n}\n\nfunction isInInactiveTree (vm) {\n  while (vm && (vm = vm.$parent)) {\n    if (vm._inactive) { return true }\n  }\n  return false\n}\n\nfunction activateChildComponent (vm, direct) {\n  if (direct) {\n    vm._directInactive = false;\n    if (isInInactiveTree(vm)) {\n      return\n    }\n  } else if (vm._directInactive) {\n    return\n  }\n  if (vm._inactive || vm._inactive === null) {\n    vm._inactive = false;\n    for (var i = 0; i < vm.$children.length; i++) {\n      activateChildComponent(vm.$children[i]);\n    }\n    callHook(vm, 'activated');\n  }\n}\n\nfunction deactivateChildComponent (vm, direct) {\n  if (direct) {\n    vm._directInactive = true;\n    if (isInInactiveTree(vm)) {\n      return\n    }\n  }\n  if (!vm._inactive) {\n    vm._inactive = true;\n    for (var i = 0; i < vm.$children.length; i++) {\n      deactivateChildComponent(vm.$children[i]);\n    }\n    callHook(vm, 'deactivated');\n  }\n}\n\nfunction callHook (vm, hook) {\n  // #7573 disable dep collection when invoking lifecycle hooks\n  pushTarget();\n  var handlers = vm.$options[hook];\n  var info = hook + \" hook\";\n  if (handlers) {\n    for (var i = 0, j = handlers.length; i < j; i++) {\n      invokeWithErrorHandling(handlers[i], vm, null, vm, info);\n    }\n  }\n  if (vm._hasHookEvent) {\n    vm.$emit('hook:' + hook);\n  }\n  popTarget();\n}\n\n/*  */\n\nvar MAX_UPDATE_COUNT = 100;\n\nvar queue = [];\nvar activatedChildren = [];\nvar has = {};\nvar circular = {};\nvar waiting = false;\nvar flushing = false;\nvar index = 0;\n\n/**\n * Reset the scheduler's state.\n */\nfunction resetSchedulerState () {\n  index = queue.length = activatedChildren.length = 0;\n  has = {};\n  if (true) {\n    circular = {};\n  }\n  waiting = flushing = false;\n}\n\n// Async edge case #6566 requires saving the timestamp when event listeners are\n// attached. However, calling performance.now() has a perf overhead especially\n// if the page has thousands of event listeners. Instead, we take a timestamp\n// every time the scheduler flushes and use that for all event listeners\n// attached during that flush.\nvar currentFlushTimestamp = 0;\n\n// Async edge case fix requires storing an event listener's attach timestamp.\nvar getNow = Date.now;\n\n// Determine what event timestamp the browser is using. Annoyingly, the\n// timestamp can either be hi-res (relative to page load) or low-res\n// (relative to UNIX epoch), so in order to compare time we have to use the\n// same timestamp type when saving the flush timestamp.\n// All IE versions use low-res event timestamps, and have problematic clock\n// implementations (#9632)\nif (inBrowser && !isIE) {\n  var performance = window.performance;\n  if (\n    performance &&\n    typeof performance.now === 'function' &&\n    getNow() > document.createEvent('Event').timeStamp\n  ) {\n    // if the event timestamp, although evaluated AFTER the Date.now(), is\n    // smaller than it, it means the event is using a hi-res timestamp,\n    // and we need to use the hi-res version for event listener timestamps as\n    // well.\n    getNow = function () { return performance.now(); };\n  }\n}\n\n/**\n * Flush both queues and run the watchers.\n */\nfunction flushSchedulerQueue () {\n  currentFlushTimestamp = getNow();\n  flushing = true;\n  var watcher, id;\n\n  // Sort queue before flush.\n  // This ensures that:\n  // 1. Components are updated from parent to child. (because parent is always\n  //    created before the child)\n  // 2. A component's user watchers are run before its render watcher (because\n  //    user watchers are created before the render watcher)\n  // 3. If a component is destroyed during a parent component's watcher run,\n  //    its watchers can be skipped.\n  queue.sort(function (a, b) { return a.id - b.id; });\n\n  // do not cache length because more watchers might be pushed\n  // as we run existing watchers\n  for (index = 0; index < queue.length; index++) {\n    watcher = queue[index];\n    if (watcher.before) {\n      watcher.before();\n    }\n    id = watcher.id;\n    has[id] = null;\n    watcher.run();\n    // in dev build, check and stop circular updates.\n    if ( true && has[id] != null) {\n      circular[id] = (circular[id] || 0) + 1;\n      if (circular[id] > MAX_UPDATE_COUNT) {\n        warn(\n          'You may have an infinite update loop ' + (\n            watcher.user\n              ? (\"in watcher with expression \\\"\" + (watcher.expression) + \"\\\"\")\n              : \"in a component render function.\"\n          ),\n          watcher.vm\n        );\n        break\n      }\n    }\n  }\n\n  // keep copies of post queues before resetting state\n  var activatedQueue = activatedChildren.slice();\n  var updatedQueue = queue.slice();\n\n  resetSchedulerState();\n\n  // call component updated and activated hooks\n  callActivatedHooks(activatedQueue);\n  callUpdatedHooks(updatedQueue);\n\n  // devtool hook\n  /* istanbul ignore if */\n  if (devtools && config.devtools) {\n    devtools.emit('flush');\n  }\n}\n\nfunction callUpdatedHooks (queue) {\n  var i = queue.length;\n  while (i--) {\n    var watcher = queue[i];\n    var vm = watcher.vm;\n    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {\n      callHook(vm, 'updated');\n    }\n  }\n}\n\n/**\n * Queue a kept-alive component that was activated during patch.\n * The queue will be processed after the entire tree has been patched.\n */\nfunction queueActivatedComponent (vm) {\n  // setting _inactive to false here so that a render function can\n  // rely on checking whether it's in an inactive tree (e.g. router-view)\n  vm._inactive = false;\n  activatedChildren.push(vm);\n}\n\nfunction callActivatedHooks (queue) {\n  for (var i = 0; i < queue.length; i++) {\n    queue[i]._inactive = true;\n    activateChildComponent(queue[i], true /* true */);\n  }\n}\n\n/**\n * Push a watcher into the watcher queue.\n * Jobs with duplicate IDs will be skipped unless it's\n * pushed when the queue is being flushed.\n */\nfunction queueWatcher (watcher) {\n  var id = watcher.id;\n  if (has[id] == null) {\n    has[id] = true;\n    if (!flushing) {\n      queue.push(watcher);\n    } else {\n      // if already flushing, splice the watcher based on its id\n      // if already past its id, it will be run next immediately.\n      var i = queue.length - 1;\n      while (i > index && queue[i].id > watcher.id) {\n        i--;\n      }\n      queue.splice(i + 1, 0, watcher);\n    }\n    // queue the flush\n    if (!waiting) {\n      waiting = true;\n\n      if ( true && !config.async) {\n        flushSchedulerQueue();\n        return\n      }\n      nextTick(flushSchedulerQueue);\n    }\n  }\n}\n\n/*  */\n\n\n\nvar uid$2 = 0;\n\n/**\n * A watcher parses an expression, collects dependencies,\n * and fires callback when the expression value changes.\n * This is used for both the $watch() api and directives.\n */\nvar Watcher = function Watcher (\n  vm,\n  expOrFn,\n  cb,\n  options,\n  isRenderWatcher\n) {\n  this.vm = vm;\n  if (isRenderWatcher) {\n    vm._watcher = this;\n  }\n  vm._watchers.push(this);\n  // options\n  if (options) {\n    this.deep = !!options.deep;\n    this.user = !!options.user;\n    this.lazy = !!options.lazy;\n    this.sync = !!options.sync;\n    this.before = options.before;\n  } else {\n    this.deep = this.user = this.lazy = this.sync = false;\n  }\n  this.cb = cb;\n  this.id = ++uid$2; // uid for batching\n  this.active = true;\n  this.dirty = this.lazy; // for lazy watchers\n  this.deps = [];\n  this.newDeps = [];\n  this.depIds = new _Set();\n  this.newDepIds = new _Set();\n  this.expression =  true\n    ? expOrFn.toString()\n    : undefined;\n  // parse expression for getter\n  if (typeof expOrFn === 'function') {\n    this.getter = expOrFn;\n  } else {\n    this.getter = parsePath(expOrFn);\n    if (!this.getter) {\n      this.getter = noop;\n       true && warn(\n        \"Failed watching path: \\\"\" + expOrFn + \"\\\" \" +\n        'Watcher only accepts simple dot-delimited paths. ' +\n        'For full control, use a function instead.',\n        vm\n      );\n    }\n  }\n  this.value = this.lazy\n    ? undefined\n    : this.get();\n};\n\n/**\n * Evaluate the getter, and re-collect dependencies.\n */\nWatcher.prototype.get = function get () {\n  pushTarget(this);\n  var value;\n  var vm = this.vm;\n  try {\n    value = this.getter.call(vm, vm);\n  } catch (e) {\n    if (this.user) {\n      handleError(e, vm, (\"getter for watcher \\\"\" + (this.expression) + \"\\\"\"));\n    } else {\n      throw e\n    }\n  } finally {\n    // \"touch\" every property so they are all tracked as\n    // dependencies for deep watching\n    if (this.deep) {\n      traverse(value);\n    }\n    popTarget();\n    this.cleanupDeps();\n  }\n  return value\n};\n\n/**\n * Add a dependency to this directive.\n */\nWatcher.prototype.addDep = function addDep (dep) {\n  var id = dep.id;\n  if (!this.newDepIds.has(id)) {\n    this.newDepIds.add(id);\n    this.newDeps.push(dep);\n    if (!this.depIds.has(id)) {\n      dep.addSub(this);\n    }\n  }\n};\n\n/**\n * Clean up for dependency collection.\n */\nWatcher.prototype.cleanupDeps = function cleanupDeps () {\n  var i = this.deps.length;\n  while (i--) {\n    var dep = this.deps[i];\n    if (!this.newDepIds.has(dep.id)) {\n      dep.removeSub(this);\n    }\n  }\n  var tmp = this.depIds;\n  this.depIds = this.newDepIds;\n  this.newDepIds = tmp;\n  this.newDepIds.clear();\n  tmp = this.deps;\n  this.deps = this.newDeps;\n  this.newDeps = tmp;\n  this.newDeps.length = 0;\n};\n\n/**\n * Subscriber interface.\n * Will be called when a dependency changes.\n */\nWatcher.prototype.update = function update () {\n  /* istanbul ignore else */\n  if (this.lazy) {\n    this.dirty = true;\n  } else if (this.sync) {\n    this.run();\n  } else {\n    queueWatcher(this);\n  }\n};\n\n/**\n * Scheduler job interface.\n * Will be called by the scheduler.\n */\nWatcher.prototype.run = function run () {\n  if (this.active) {\n    var value = this.get();\n    if (\n      value !== this.value ||\n      // Deep watchers and watchers on Object/Arrays should fire even\n      // when the value is the same, because the value may\n      // have mutated.\n      isObject(value) ||\n      this.deep\n    ) {\n      // set new value\n      var oldValue = this.value;\n      this.value = value;\n      if (this.user) {\n        try {\n          this.cb.call(this.vm, value, oldValue);\n        } catch (e) {\n          handleError(e, this.vm, (\"callback for watcher \\\"\" + (this.expression) + \"\\\"\"));\n        }\n      } else {\n        this.cb.call(this.vm, value, oldValue);\n      }\n    }\n  }\n};\n\n/**\n * Evaluate the value of the watcher.\n * This only gets called for lazy watchers.\n */\nWatcher.prototype.evaluate = function evaluate () {\n  this.value = this.get();\n  this.dirty = false;\n};\n\n/**\n * Depend on all deps collected by this watcher.\n */\nWatcher.prototype.depend = function depend () {\n  var i = this.deps.length;\n  while (i--) {\n    this.deps[i].depend();\n  }\n};\n\n/**\n * Remove self from all dependencies' subscriber list.\n */\nWatcher.prototype.teardown = function teardown () {\n  if (this.active) {\n    // remove self from vm's watcher list\n    // this is a somewhat expensive operation so we skip it\n    // if the vm is being destroyed.\n    if (!this.vm._isBeingDestroyed) {\n      remove(this.vm._watchers, this);\n    }\n    var i = this.deps.length;\n    while (i--) {\n      this.deps[i].removeSub(this);\n    }\n    this.active = false;\n  }\n};\n\n/*  */\n\nvar sharedPropertyDefinition = {\n  enumerable: true,\n  configurable: true,\n  get: noop,\n  set: noop\n};\n\nfunction proxy (target, sourceKey, key) {\n  sharedPropertyDefinition.get = function proxyGetter () {\n    return this[sourceKey][key]\n  };\n  sharedPropertyDefinition.set = function proxySetter (val) {\n    this[sourceKey][key] = val;\n  };\n  Object.defineProperty(target, key, sharedPropertyDefinition);\n}\n\nfunction initState (vm) {\n  vm._watchers = [];\n  var opts = vm.$options;\n  if (opts.props) { initProps(vm, opts.props); }\n  if (opts.methods) { initMethods(vm, opts.methods); }\n  if (opts.data) {\n    initData(vm);\n  } else {\n    observe(vm._data = {}, true /* asRootData */);\n  }\n  if (opts.computed) { initComputed(vm, opts.computed); }\n  if (opts.watch && opts.watch !== nativeWatch) {\n    initWatch(vm, opts.watch);\n  }\n}\n\nfunction initProps (vm, propsOptions) {\n  var propsData = vm.$options.propsData || {};\n  var props = vm._props = {};\n  // cache prop keys so that future props updates can iterate using Array\n  // instead of dynamic object key enumeration.\n  var keys = vm.$options._propKeys = [];\n  var isRoot = !vm.$parent;\n  // root instance props should be converted\n  if (!isRoot) {\n    toggleObserving(false);\n  }\n  var loop = function ( key ) {\n    keys.push(key);\n    var value = validateProp(key, propsOptions, propsData, vm);\n    /* istanbul ignore else */\n    if (true) {\n      var hyphenatedKey = hyphenate(key);\n      if (isReservedAttribute(hyphenatedKey) ||\n          config.isReservedAttr(hyphenatedKey)) {\n        warn(\n          (\"\\\"\" + hyphenatedKey + \"\\\" is a reserved attribute and cannot be used as component prop.\"),\n          vm\n        );\n      }\n      defineReactive$$1(props, key, value, function () {\n        if (!isRoot && !isUpdatingChildComponent) {\n          warn(\n            \"Avoid mutating a prop directly since the value will be \" +\n            \"overwritten whenever the parent component re-renders. \" +\n            \"Instead, use a data or computed property based on the prop's \" +\n            \"value. Prop being mutated: \\\"\" + key + \"\\\"\",\n            vm\n          );\n        }\n      });\n    } else {}\n    // static props are already proxied on the component's prototype\n    // during Vue.extend(). We only need to proxy props defined at\n    // instantiation here.\n    if (!(key in vm)) {\n      proxy(vm, \"_props\", key);\n    }\n  };\n\n  for (var key in propsOptions) loop( key );\n  toggleObserving(true);\n}\n\nfunction initData (vm) {\n  var data = vm.$options.data;\n  data = vm._data = typeof data === 'function'\n    ? getData(data, vm)\n    : data || {};\n  if (!isPlainObject(data)) {\n    data = {};\n     true && warn(\n      'data functions should return an object:\\n' +\n      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',\n      vm\n    );\n  }\n  // proxy data on instance\n  var keys = Object.keys(data);\n  var props = vm.$options.props;\n  var methods = vm.$options.methods;\n  var i = keys.length;\n  while (i--) {\n    var key = keys[i];\n    if (true) {\n      if (methods && hasOwn(methods, key)) {\n        warn(\n          (\"Method \\\"\" + key + \"\\\" has already been defined as a data property.\"),\n          vm\n        );\n      }\n    }\n    if (props && hasOwn(props, key)) {\n       true && warn(\n        \"The data property \\\"\" + key + \"\\\" is already declared as a prop. \" +\n        \"Use prop default value instead.\",\n        vm\n      );\n    } else if (!isReserved(key)) {\n      proxy(vm, \"_data\", key);\n    }\n  }\n  // observe data\n  observe(data, true /* asRootData */);\n}\n\nfunction getData (data, vm) {\n  // #7573 disable dep collection when invoking data getters\n  pushTarget();\n  try {\n    return data.call(vm, vm)\n  } catch (e) {\n    handleError(e, vm, \"data()\");\n    return {}\n  } finally {\n    popTarget();\n  }\n}\n\nvar computedWatcherOptions = { lazy: true };\n\nfunction initComputed (vm, computed) {\n  // $flow-disable-line\n  var watchers = vm._computedWatchers = Object.create(null);\n  // computed properties are just getters during SSR\n  var isSSR = isServerRendering();\n\n  for (var key in computed) {\n    var userDef = computed[key];\n    var getter = typeof userDef === 'function' ? userDef : userDef.get;\n    if ( true && getter == null) {\n      warn(\n        (\"Getter is missing for computed property \\\"\" + key + \"\\\".\"),\n        vm\n      );\n    }\n\n    if (!isSSR) {\n      // create internal watcher for the computed property.\n      watchers[key] = new Watcher(\n        vm,\n        getter || noop,\n        noop,\n        computedWatcherOptions\n      );\n    }\n\n    // component-defined computed properties are already defined on the\n    // component prototype. We only need to define computed properties defined\n    // at instantiation here.\n    if (!(key in vm)) {\n      defineComputed(vm, key, userDef);\n    } else if (true) {\n      if (key in vm.$data) {\n        warn((\"The computed property \\\"\" + key + \"\\\" is already defined in data.\"), vm);\n      } else if (vm.$options.props && key in vm.$options.props) {\n        warn((\"The computed property \\\"\" + key + \"\\\" is already defined as a prop.\"), vm);\n      }\n    }\n  }\n}\n\nfunction defineComputed (\n  target,\n  key,\n  userDef\n) {\n  var shouldCache = !isServerRendering();\n  if (typeof userDef === 'function') {\n    sharedPropertyDefinition.get = shouldCache\n      ? createComputedGetter(key)\n      : createGetterInvoker(userDef);\n    sharedPropertyDefinition.set = noop;\n  } else {\n    sharedPropertyDefinition.get = userDef.get\n      ? shouldCache && userDef.cache !== false\n        ? createComputedGetter(key)\n        : createGetterInvoker(userDef.get)\n      : noop;\n    sharedPropertyDefinition.set = userDef.set || noop;\n  }\n  if ( true &&\n      sharedPropertyDefinition.set === noop) {\n    sharedPropertyDefinition.set = function () {\n      warn(\n        (\"Computed property \\\"\" + key + \"\\\" was assigned to but it has no setter.\"),\n        this\n      );\n    };\n  }\n  Object.defineProperty(target, key, sharedPropertyDefinition);\n}\n\nfunction createComputedGetter (key) {\n  return function computedGetter () {\n    var watcher = this._computedWatchers && this._computedWatchers[key];\n    if (watcher) {\n      if (watcher.dirty) {\n        watcher.evaluate();\n      }\n      if (Dep.target) {\n        watcher.depend();\n      }\n      return watcher.value\n    }\n  }\n}\n\nfunction createGetterInvoker(fn) {\n  return function computedGetter () {\n    return fn.call(this, this)\n  }\n}\n\nfunction initMethods (vm, methods) {\n  var props = vm.$options.props;\n  for (var key in methods) {\n    if (true) {\n      if (typeof methods[key] !== 'function') {\n        warn(\n          \"Method \\\"\" + key + \"\\\" has type \\\"\" + (typeof methods[key]) + \"\\\" in the component definition. \" +\n          \"Did you reference the function correctly?\",\n          vm\n        );\n      }\n      if (props && hasOwn(props, key)) {\n        warn(\n          (\"Method \\\"\" + key + \"\\\" has already been defined as a prop.\"),\n          vm\n        );\n      }\n      if ((key in vm) && isReserved(key)) {\n        warn(\n          \"Method \\\"\" + key + \"\\\" conflicts with an existing Vue instance method. \" +\n          \"Avoid defining component methods that start with _ or $.\"\n        );\n      }\n    }\n    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);\n  }\n}\n\nfunction initWatch (vm, watch) {\n  for (var key in watch) {\n    var handler = watch[key];\n    if (Array.isArray(handler)) {\n      for (var i = 0; i < handler.length; i++) {\n        createWatcher(vm, key, handler[i]);\n      }\n    } else {\n      createWatcher(vm, key, handler);\n    }\n  }\n}\n\nfunction createWatcher (\n  vm,\n  expOrFn,\n  handler,\n  options\n) {\n  if (isPlainObject(handler)) {\n    options = handler;\n    handler = handler.handler;\n  }\n  if (typeof handler === 'string') {\n    handler = vm[handler];\n  }\n  return vm.$watch(expOrFn, handler, options)\n}\n\nfunction stateMixin (Vue) {\n  // flow somehow has problems with directly declared definition object\n  // when using Object.defineProperty, so we have to procedurally build up\n  // the object here.\n  var dataDef = {};\n  dataDef.get = function () { return this._data };\n  var propsDef = {};\n  propsDef.get = function () { return this._props };\n  if (true) {\n    dataDef.set = function () {\n      warn(\n        'Avoid replacing instance root $data. ' +\n        'Use nested data properties instead.',\n        this\n      );\n    };\n    propsDef.set = function () {\n      warn(\"$props is readonly.\", this);\n    };\n  }\n  Object.defineProperty(Vue.prototype, '$data', dataDef);\n  Object.defineProperty(Vue.prototype, '$props', propsDef);\n\n  Vue.prototype.$set = set;\n  Vue.prototype.$delete = del;\n\n  Vue.prototype.$watch = function (\n    expOrFn,\n    cb,\n    options\n  ) {\n    var vm = this;\n    if (isPlainObject(cb)) {\n      return createWatcher(vm, expOrFn, cb, options)\n    }\n    options = options || {};\n    options.user = true;\n    var watcher = new Watcher(vm, expOrFn, cb, options);\n    if (options.immediate) {\n      try {\n        cb.call(vm, watcher.value);\n      } catch (error) {\n        handleError(error, vm, (\"callback for immediate watcher \\\"\" + (watcher.expression) + \"\\\"\"));\n      }\n    }\n    return function unwatchFn () {\n      watcher.teardown();\n    }\n  };\n}\n\n/*  */\n\nvar uid$3 = 0;\n\nfunction initMixin (Vue) {\n  Vue.prototype._init = function (options) {\n    var vm = this;\n    // a uid\n    vm._uid = uid$3++;\n\n    var startTag, endTag;\n    /* istanbul ignore if */\n    if ( true && config.performance && mark) {\n      startTag = \"vue-perf-start:\" + (vm._uid);\n      endTag = \"vue-perf-end:\" + (vm._uid);\n      mark(startTag);\n    }\n\n    // a flag to avoid this being observed\n    vm._isVue = true;\n    // merge options\n    if (options && options._isComponent) {\n      // optimize internal component instantiation\n      // since dynamic options merging is pretty slow, and none of the\n      // internal component options needs special treatment.\n      initInternalComponent(vm, options);\n    } else {\n      vm.$options = mergeOptions(\n        resolveConstructorOptions(vm.constructor),\n        options || {},\n        vm\n      );\n    }\n    /* istanbul ignore else */\n    if (true) {\n      initProxy(vm);\n    } else {}\n    // expose real self\n    vm._self = vm;\n    initLifecycle(vm);\n    initEvents(vm);\n    initRender(vm);\n    callHook(vm, 'beforeCreate');\n    initInjections(vm); // resolve injections before data/props\n    initState(vm);\n    initProvide(vm); // resolve provide after data/props\n    callHook(vm, 'created');\n\n    /* istanbul ignore if */\n    if ( true && config.performance && mark) {\n      vm._name = formatComponentName(vm, false);\n      mark(endTag);\n      measure((\"vue \" + (vm._name) + \" init\"), startTag, endTag);\n    }\n\n    if (vm.$options.el) {\n      vm.$mount(vm.$options.el);\n    }\n  };\n}\n\nfunction initInternalComponent (vm, options) {\n  var opts = vm.$options = Object.create(vm.constructor.options);\n  // doing this because it's faster than dynamic enumeration.\n  var parentVnode = options._parentVnode;\n  opts.parent = options.parent;\n  opts._parentVnode = parentVnode;\n\n  var vnodeComponentOptions = parentVnode.componentOptions;\n  opts.propsData = vnodeComponentOptions.propsData;\n  opts._parentListeners = vnodeComponentOptions.listeners;\n  opts._renderChildren = vnodeComponentOptions.children;\n  opts._componentTag = vnodeComponentOptions.tag;\n\n  if (options.render) {\n    opts.render = options.render;\n    opts.staticRenderFns = options.staticRenderFns;\n  }\n}\n\nfunction resolveConstructorOptions (Ctor) {\n  var options = Ctor.options;\n  if (Ctor.super) {\n    var superOptions = resolveConstructorOptions(Ctor.super);\n    var cachedSuperOptions = Ctor.superOptions;\n    if (superOptions !== cachedSuperOptions) {\n      // super option changed,\n      // need to resolve new options.\n      Ctor.superOptions = superOptions;\n      // check if there are any late-modified/attached options (#4976)\n      var modifiedOptions = resolveModifiedOptions(Ctor);\n      // update base extend options\n      if (modifiedOptions) {\n        extend(Ctor.extendOptions, modifiedOptions);\n      }\n      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);\n      if (options.name) {\n        options.components[options.name] = Ctor;\n      }\n    }\n  }\n  return options\n}\n\nfunction resolveModifiedOptions (Ctor) {\n  var modified;\n  var latest = Ctor.options;\n  var sealed = Ctor.sealedOptions;\n  for (var key in latest) {\n    if (latest[key] !== sealed[key]) {\n      if (!modified) { modified = {}; }\n      modified[key] = latest[key];\n    }\n  }\n  return modified\n}\n\nfunction Vue (options) {\n  if ( true &&\n    !(this instanceof Vue)\n  ) {\n    warn('Vue is a constructor and should be called with the `new` keyword');\n  }\n  this._init(options);\n}\n\ninitMixin(Vue);\nstateMixin(Vue);\neventsMixin(Vue);\nlifecycleMixin(Vue);\nrenderMixin(Vue);\n\n/*  */\n\nfunction initUse (Vue) {\n  Vue.use = function (plugin) {\n    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));\n    if (installedPlugins.indexOf(plugin) > -1) {\n      return this\n    }\n\n    // additional parameters\n    var args = toArray(arguments, 1);\n    args.unshift(this);\n    if (typeof plugin.install === 'function') {\n      plugin.install.apply(plugin, args);\n    } else if (typeof plugin === 'function') {\n      plugin.apply(null, args);\n    }\n    installedPlugins.push(plugin);\n    return this\n  };\n}\n\n/*  */\n\nfunction initMixin$1 (Vue) {\n  Vue.mixin = function (mixin) {\n    this.options = mergeOptions(this.options, mixin);\n    return this\n  };\n}\n\n/*  */\n\nfunction initExtend (Vue) {\n  /**\n   * Each instance constructor, including Vue, has a unique\n   * cid. This enables us to create wrapped \"child\n   * constructors\" for prototypal inheritance and cache them.\n   */\n  Vue.cid = 0;\n  var cid = 1;\n\n  /**\n   * Class inheritance\n   */\n  Vue.extend = function (extendOptions) {\n    extendOptions = extendOptions || {};\n    var Super = this;\n    var SuperId = Super.cid;\n    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});\n    if (cachedCtors[SuperId]) {\n      return cachedCtors[SuperId]\n    }\n\n    var name = extendOptions.name || Super.options.name;\n    if ( true && name) {\n      validateComponentName(name);\n    }\n\n    var Sub = function VueComponent (options) {\n      this._init(options);\n    };\n    Sub.prototype = Object.create(Super.prototype);\n    Sub.prototype.constructor = Sub;\n    Sub.cid = cid++;\n    Sub.options = mergeOptions(\n      Super.options,\n      extendOptions\n    );\n    Sub['super'] = Super;\n\n    // For props and computed properties, we define the proxy getters on\n    // the Vue instances at extension time, on the extended prototype. This\n    // avoids Object.defineProperty calls for each instance created.\n    if (Sub.options.props) {\n      initProps$1(Sub);\n    }\n    if (Sub.options.computed) {\n      initComputed$1(Sub);\n    }\n\n    // allow further extension/mixin/plugin usage\n    Sub.extend = Super.extend;\n    Sub.mixin = Super.mixin;\n    Sub.use = Super.use;\n\n    // create asset registers, so extended classes\n    // can have their private assets too.\n    ASSET_TYPES.forEach(function (type) {\n      Sub[type] = Super[type];\n    });\n    // enable recursive self-lookup\n    if (name) {\n      Sub.options.components[name] = Sub;\n    }\n\n    // keep a reference to the super options at extension time.\n    // later at instantiation we can check if Super's options have\n    // been updated.\n    Sub.superOptions = Super.options;\n    Sub.extendOptions = extendOptions;\n    Sub.sealedOptions = extend({}, Sub.options);\n\n    // cache constructor\n    cachedCtors[SuperId] = Sub;\n    return Sub\n  };\n}\n\nfunction initProps$1 (Comp) {\n  var props = Comp.options.props;\n  for (var key in props) {\n    proxy(Comp.prototype, \"_props\", key);\n  }\n}\n\nfunction initComputed$1 (Comp) {\n  var computed = Comp.options.computed;\n  for (var key in computed) {\n    defineComputed(Comp.prototype, key, computed[key]);\n  }\n}\n\n/*  */\n\nfunction initAssetRegisters (Vue) {\n  /**\n   * Create asset registration methods.\n   */\n  ASSET_TYPES.forEach(function (type) {\n    Vue[type] = function (\n      id,\n      definition\n    ) {\n      if (!definition) {\n        return this.options[type + 's'][id]\n      } else {\n        /* istanbul ignore if */\n        if ( true && type === 'component') {\n          validateComponentName(id);\n        }\n        if (type === 'component' && isPlainObject(definition)) {\n          definition.name = definition.name || id;\n          definition = this.options._base.extend(definition);\n        }\n        if (type === 'directive' && typeof definition === 'function') {\n          definition = { bind: definition, update: definition };\n        }\n        this.options[type + 's'][id] = definition;\n        return definition\n      }\n    };\n  });\n}\n\n/*  */\n\n\n\nfunction getComponentName (opts) {\n  return opts && (opts.Ctor.options.name || opts.tag)\n}\n\nfunction matches (pattern, name) {\n  if (Array.isArray(pattern)) {\n    return pattern.indexOf(name) > -1\n  } else if (typeof pattern === 'string') {\n    return pattern.split(',').indexOf(name) > -1\n  } else if (isRegExp(pattern)) {\n    return pattern.test(name)\n  }\n  /* istanbul ignore next */\n  return false\n}\n\nfunction pruneCache (keepAliveInstance, filter) {\n  var cache = keepAliveInstance.cache;\n  var keys = keepAliveInstance.keys;\n  var _vnode = keepAliveInstance._vnode;\n  for (var key in cache) {\n    var cachedNode = cache[key];\n    if (cachedNode) {\n      var name = getComponentName(cachedNode.componentOptions);\n      if (name && !filter(name)) {\n        pruneCacheEntry(cache, key, keys, _vnode);\n      }\n    }\n  }\n}\n\nfunction pruneCacheEntry (\n  cache,\n  key,\n  keys,\n  current\n) {\n  var cached$$1 = cache[key];\n  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {\n    cached$$1.componentInstance.$destroy();\n  }\n  cache[key] = null;\n  remove(keys, key);\n}\n\nvar patternTypes = [String, RegExp, Array];\n\nvar KeepAlive = {\n  name: 'keep-alive',\n  abstract: true,\n\n  props: {\n    include: patternTypes,\n    exclude: patternTypes,\n    max: [String, Number]\n  },\n\n  created: function created () {\n    this.cache = Object.create(null);\n    this.keys = [];\n  },\n\n  destroyed: function destroyed () {\n    for (var key in this.cache) {\n      pruneCacheEntry(this.cache, key, this.keys);\n    }\n  },\n\n  mounted: function mounted () {\n    var this$1 = this;\n\n    this.$watch('include', function (val) {\n      pruneCache(this$1, function (name) { return matches(val, name); });\n    });\n    this.$watch('exclude', function (val) {\n      pruneCache(this$1, function (name) { return !matches(val, name); });\n    });\n  },\n\n  render: function render () {\n    var slot = this.$slots.default;\n    var vnode = getFirstComponentChild(slot);\n    var componentOptions = vnode && vnode.componentOptions;\n    if (componentOptions) {\n      // check pattern\n      var name = getComponentName(componentOptions);\n      var ref = this;\n      var include = ref.include;\n      var exclude = ref.exclude;\n      if (\n        // not included\n        (include && (!name || !matches(include, name))) ||\n        // excluded\n        (exclude && name && matches(exclude, name))\n      ) {\n        return vnode\n      }\n\n      var ref$1 = this;\n      var cache = ref$1.cache;\n      var keys = ref$1.keys;\n      var key = vnode.key == null\n        // same constructor may get registered as different local components\n        // so cid alone is not enough (#3269)\n        ? componentOptions.Ctor.cid + (componentOptions.tag ? (\"::\" + (componentOptions.tag)) : '')\n        : vnode.key;\n      if (cache[key]) {\n        vnode.componentInstance = cache[key].componentInstance;\n        // make current key freshest\n        remove(keys, key);\n        keys.push(key);\n      } else {\n        cache[key] = vnode;\n        keys.push(key);\n        // prune oldest entry\n        if (this.max && keys.length > parseInt(this.max)) {\n          pruneCacheEntry(cache, keys[0], keys, this._vnode);\n        }\n      }\n\n      vnode.data.keepAlive = true;\n    }\n    return vnode || (slot && slot[0])\n  }\n};\n\nvar builtInComponents = {\n  KeepAlive: KeepAlive\n};\n\n/*  */\n\nfunction initGlobalAPI (Vue) {\n  // config\n  var configDef = {};\n  configDef.get = function () { return config; };\n  if (true) {\n    configDef.set = function () {\n      warn(\n        'Do not replace the Vue.config object, set individual fields instead.'\n      );\n    };\n  }\n  Object.defineProperty(Vue, 'config', configDef);\n\n  // exposed util methods.\n  // NOTE: these are not considered part of the public API - avoid relying on\n  // them unless you are aware of the risk.\n  Vue.util = {\n    warn: warn,\n    extend: extend,\n    mergeOptions: mergeOptions,\n    defineReactive: defineReactive$$1\n  };\n\n  Vue.set = set;\n  Vue.delete = del;\n  Vue.nextTick = nextTick;\n\n  // 2.6 explicit observable API\n  Vue.observable = function (obj) {\n    observe(obj);\n    return obj\n  };\n\n  Vue.options = Object.create(null);\n  ASSET_TYPES.forEach(function (type) {\n    Vue.options[type + 's'] = Object.create(null);\n  });\n\n  // this is used to identify the \"base\" constructor to extend all plain-object\n  // components with in Weex's multi-instance scenarios.\n  Vue.options._base = Vue;\n\n  extend(Vue.options.components, builtInComponents);\n\n  initUse(Vue);\n  initMixin$1(Vue);\n  initExtend(Vue);\n  initAssetRegisters(Vue);\n}\n\ninitGlobalAPI(Vue);\n\nObject.defineProperty(Vue.prototype, '$isServer', {\n  get: isServerRendering\n});\n\nObject.defineProperty(Vue.prototype, '$ssrContext', {\n  get: function get () {\n    /* istanbul ignore next */\n    return this.$vnode && this.$vnode.ssrContext\n  }\n});\n\n// expose FunctionalRenderContext for ssr runtime helper installation\nObject.defineProperty(Vue, 'FunctionalRenderContext', {\n  value: FunctionalRenderContext\n});\n\nVue.version = '2.6.10';\n\n/*  */\n\n// these are reserved for web because they are directly compiled away\n// during template compilation\nvar isReservedAttr = makeMap('style,class');\n\n// attributes that should be using props for binding\nvar acceptValue = makeMap('input,textarea,option,select,progress');\nvar mustUseProp = function (tag, type, attr) {\n  return (\n    (attr === 'value' && acceptValue(tag)) && type !== 'button' ||\n    (attr === 'selected' && tag === 'option') ||\n    (attr === 'checked' && tag === 'input') ||\n    (attr === 'muted' && tag === 'video')\n  )\n};\n\nvar isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');\n\nvar isValidContentEditableValue = makeMap('events,caret,typing,plaintext-only');\n\nvar convertEnumeratedValue = function (key, value) {\n  return isFalsyAttrValue(value) || value === 'false'\n    ? 'false'\n    // allow arbitrary string value for contenteditable\n    : key === 'contenteditable' && isValidContentEditableValue(value)\n      ? value\n      : 'true'\n};\n\nvar isBooleanAttr = makeMap(\n  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +\n  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +\n  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +\n  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +\n  'required,reversed,scoped,seamless,selected,sortable,translate,' +\n  'truespeed,typemustmatch,visible'\n);\n\nvar xlinkNS = 'http://www.w3.org/1999/xlink';\n\nvar isXlink = function (name) {\n  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'\n};\n\nvar getXlinkProp = function (name) {\n  return isXlink(name) ? name.slice(6, name.length) : ''\n};\n\nvar isFalsyAttrValue = function (val) {\n  return val == null || val === false\n};\n\n/*  */\n\nfunction genClassForVnode (vnode) {\n  var data = vnode.data;\n  var parentNode = vnode;\n  var childNode = vnode;\n  while (isDef(childNode.componentInstance)) {\n    childNode = childNode.componentInstance._vnode;\n    if (childNode && childNode.data) {\n      data = mergeClassData(childNode.data, data);\n    }\n  }\n  while (isDef(parentNode = parentNode.parent)) {\n    if (parentNode && parentNode.data) {\n      data = mergeClassData(data, parentNode.data);\n    }\n  }\n  return renderClass(data.staticClass, data.class)\n}\n\nfunction mergeClassData (child, parent) {\n  return {\n    staticClass: concat(child.staticClass, parent.staticClass),\n    class: isDef(child.class)\n      ? [child.class, parent.class]\n      : parent.class\n  }\n}\n\nfunction renderClass (\n  staticClass,\n  dynamicClass\n) {\n  if (isDef(staticClass) || isDef(dynamicClass)) {\n    return concat(staticClass, stringifyClass(dynamicClass))\n  }\n  /* istanbul ignore next */\n  return ''\n}\n\nfunction concat (a, b) {\n  return a ? b ? (a + ' ' + b) : a : (b || '')\n}\n\nfunction stringifyClass (value) {\n  if (Array.isArray(value)) {\n    return stringifyArray(value)\n  }\n  if (isObject(value)) {\n    return stringifyObject(value)\n  }\n  if (typeof value === 'string') {\n    return value\n  }\n  /* istanbul ignore next */\n  return ''\n}\n\nfunction stringifyArray (value) {\n  var res = '';\n  var stringified;\n  for (var i = 0, l = value.length; i < l; i++) {\n    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {\n      if (res) { res += ' '; }\n      res += stringified;\n    }\n  }\n  return res\n}\n\nfunction stringifyObject (value) {\n  var res = '';\n  for (var key in value) {\n    if (value[key]) {\n      if (res) { res += ' '; }\n      res += key;\n    }\n  }\n  return res\n}\n\n/*  */\n\nvar namespaceMap = {\n  svg: 'http://www.w3.org/2000/svg',\n  math: 'http://www.w3.org/1998/Math/MathML'\n};\n\nvar isHTMLTag = makeMap(\n  'html,body,base,head,link,meta,style,title,' +\n  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +\n  'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' +\n  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +\n  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +\n  'embed,object,param,source,canvas,script,noscript,del,ins,' +\n  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +\n  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +\n  'output,progress,select,textarea,' +\n  'details,dialog,menu,menuitem,summary,' +\n  'content,element,shadow,template,blockquote,iframe,tfoot'\n);\n\n// this map is intentionally selective, only covering SVG elements that may\n// contain child elements.\nvar isSVG = makeMap(\n  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +\n  'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +\n  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',\n  true\n);\n\nvar isReservedTag = function (tag) {\n  return isHTMLTag(tag) || isSVG(tag)\n};\n\nfunction getTagNamespace (tag) {\n  if (isSVG(tag)) {\n    return 'svg'\n  }\n  // basic support for MathML\n  // note it doesn't support other MathML elements being component roots\n  if (tag === 'math') {\n    return 'math'\n  }\n}\n\nvar unknownElementCache = Object.create(null);\nfunction isUnknownElement (tag) {\n  /* istanbul ignore if */\n  if (!inBrowser) {\n    return true\n  }\n  if (isReservedTag(tag)) {\n    return false\n  }\n  tag = tag.toLowerCase();\n  /* istanbul ignore if */\n  if (unknownElementCache[tag] != null) {\n    return unknownElementCache[tag]\n  }\n  var el = document.createElement(tag);\n  if (tag.indexOf('-') > -1) {\n    // http://stackoverflow.com/a/28210364/1070244\n    return (unknownElementCache[tag] = (\n      el.constructor === window.HTMLUnknownElement ||\n      el.constructor === window.HTMLElement\n    ))\n  } else {\n    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))\n  }\n}\n\nvar isTextInputType = makeMap('text,number,password,search,email,tel,url');\n\n/*  */\n\n/**\n * Query an element selector if it's not an element already.\n */\nfunction query (el) {\n  if (typeof el === 'string') {\n    var selected = document.querySelector(el);\n    if (!selected) {\n       true && warn(\n        'Cannot find element: ' + el\n      );\n      return document.createElement('div')\n    }\n    return selected\n  } else {\n    return el\n  }\n}\n\n/*  */\n\nfunction createElement$1 (tagName, vnode) {\n  var elm = document.createElement(tagName);\n  if (tagName !== 'select') {\n    return elm\n  }\n  // false or null will remove the attribute but undefined will not\n  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {\n    elm.setAttribute('multiple', 'multiple');\n  }\n  return elm\n}\n\nfunction createElementNS (namespace, tagName) {\n  return document.createElementNS(namespaceMap[namespace], tagName)\n}\n\nfunction createTextNode (text) {\n  return document.createTextNode(text)\n}\n\nfunction createComment (text) {\n  return document.createComment(text)\n}\n\nfunction insertBefore (parentNode, newNode, referenceNode) {\n  parentNode.insertBefore(newNode, referenceNode);\n}\n\nfunction removeChild (node, child) {\n  node.removeChild(child);\n}\n\nfunction appendChild (node, child) {\n  node.appendChild(child);\n}\n\nfunction parentNode (node) {\n  return node.parentNode\n}\n\nfunction nextSibling (node) {\n  return node.nextSibling\n}\n\nfunction tagName (node) {\n  return node.tagName\n}\n\nfunction setTextContent (node, text) {\n  node.textContent = text;\n}\n\nfunction setStyleScope (node, scopeId) {\n  node.setAttribute(scopeId, '');\n}\n\nvar nodeOps = /*#__PURE__*/Object.freeze({\n  createElement: createElement$1,\n  createElementNS: createElementNS,\n  createTextNode: createTextNode,\n  createComment: createComment,\n  insertBefore: insertBefore,\n  removeChild: removeChild,\n  appendChild: appendChild,\n  parentNode: parentNode,\n  nextSibling: nextSibling,\n  tagName: tagName,\n  setTextContent: setTextContent,\n  setStyleScope: setStyleScope\n});\n\n/*  */\n\nvar ref = {\n  create: function create (_, vnode) {\n    registerRef(vnode);\n  },\n  update: function update (oldVnode, vnode) {\n    if (oldVnode.data.ref !== vnode.data.ref) {\n      registerRef(oldVnode, true);\n      registerRef(vnode);\n    }\n  },\n  destroy: function destroy (vnode) {\n    registerRef(vnode, true);\n  }\n};\n\nfunction registerRef (vnode, isRemoval) {\n  var key = vnode.data.ref;\n  if (!isDef(key)) { return }\n\n  var vm = vnode.context;\n  var ref = vnode.componentInstance || vnode.elm;\n  var refs = vm.$refs;\n  if (isRemoval) {\n    if (Array.isArray(refs[key])) {\n      remove(refs[key], ref);\n    } else if (refs[key] === ref) {\n      refs[key] = undefined;\n    }\n  } else {\n    if (vnode.data.refInFor) {\n      if (!Array.isArray(refs[key])) {\n        refs[key] = [ref];\n      } else if (refs[key].indexOf(ref) < 0) {\n        // $flow-disable-line\n        refs[key].push(ref);\n      }\n    } else {\n      refs[key] = ref;\n    }\n  }\n}\n\n/**\n * Virtual DOM patching algorithm based on Snabbdom by\n * Simon Friis Vindum (@paldepind)\n * Licensed under the MIT License\n * https://github.com/paldepind/snabbdom/blob/master/LICENSE\n *\n * modified by Evan You (@yyx990803)\n *\n * Not type-checking this because this file is perf-critical and the cost\n * of making flow understand it is not worth it.\n */\n\nvar emptyNode = new VNode('', {}, []);\n\nvar hooks = ['create', 'activate', 'update', 'remove', 'destroy'];\n\nfunction sameVnode (a, b) {\n  return (\n    a.key === b.key && (\n      (\n        a.tag === b.tag &&\n        a.isComment === b.isComment &&\n        isDef(a.data) === isDef(b.data) &&\n        sameInputType(a, b)\n      ) || (\n        isTrue(a.isAsyncPlaceholder) &&\n        a.asyncFactory === b.asyncFactory &&\n        isUndef(b.asyncFactory.error)\n      )\n    )\n  )\n}\n\nfunction sameInputType (a, b) {\n  if (a.tag !== 'input') { return true }\n  var i;\n  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;\n  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;\n  return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB)\n}\n\nfunction createKeyToOldIdx (children, beginIdx, endIdx) {\n  var i, key;\n  var map = {};\n  for (i = beginIdx; i <= endIdx; ++i) {\n    key = children[i].key;\n    if (isDef(key)) { map[key] = i; }\n  }\n  return map\n}\n\nfunction createPatchFunction (backend) {\n  var i, j;\n  var cbs = {};\n\n  var modules = backend.modules;\n  var nodeOps = backend.nodeOps;\n\n  for (i = 0; i < hooks.length; ++i) {\n    cbs[hooks[i]] = [];\n    for (j = 0; j < modules.length; ++j) {\n      if (isDef(modules[j][hooks[i]])) {\n        cbs[hooks[i]].push(modules[j][hooks[i]]);\n      }\n    }\n  }\n\n  function emptyNodeAt (elm) {\n    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)\n  }\n\n  function createRmCb (childElm, listeners) {\n    function remove$$1 () {\n      if (--remove$$1.listeners === 0) {\n        removeNode(childElm);\n      }\n    }\n    remove$$1.listeners = listeners;\n    return remove$$1\n  }\n\n  function removeNode (el) {\n    var parent = nodeOps.parentNode(el);\n    // element may have already been removed due to v-html / v-text\n    if (isDef(parent)) {\n      nodeOps.removeChild(parent, el);\n    }\n  }\n\n  function isUnknownElement$$1 (vnode, inVPre) {\n    return (\n      !inVPre &&\n      !vnode.ns &&\n      !(\n        config.ignoredElements.length &&\n        config.ignoredElements.some(function (ignore) {\n          return isRegExp(ignore)\n            ? ignore.test(vnode.tag)\n            : ignore === vnode.tag\n        })\n      ) &&\n      config.isUnknownElement(vnode.tag)\n    )\n  }\n\n  var creatingElmInVPre = 0;\n\n  function createElm (\n    vnode,\n    insertedVnodeQueue,\n    parentElm,\n    refElm,\n    nested,\n    ownerArray,\n    index\n  ) {\n    if (isDef(vnode.elm) && isDef(ownerArray)) {\n      // This vnode was used in a previous render!\n      // now it's used as a new node, overwriting its elm would cause\n      // potential patch errors down the road when it's used as an insertion\n      // reference node. Instead, we clone the node on-demand before creating\n      // associated DOM element for it.\n      vnode = ownerArray[index] = cloneVNode(vnode);\n    }\n\n    vnode.isRootInsert = !nested; // for transition enter check\n    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {\n      return\n    }\n\n    var data = vnode.data;\n    var children = vnode.children;\n    var tag = vnode.tag;\n    if (isDef(tag)) {\n      if (true) {\n        if (data && data.pre) {\n          creatingElmInVPre++;\n        }\n        if (isUnknownElement$$1(vnode, creatingElmInVPre)) {\n          warn(\n            'Unknown custom element: <' + tag + '> - did you ' +\n            'register the component correctly? For recursive components, ' +\n            'make sure to provide the \"name\" option.',\n            vnode.context\n          );\n        }\n      }\n\n      vnode.elm = vnode.ns\n        ? nodeOps.createElementNS(vnode.ns, tag)\n        : nodeOps.createElement(tag, vnode);\n      setScope(vnode);\n\n      /* istanbul ignore if */\n      {\n        createChildren(vnode, children, insertedVnodeQueue);\n        if (isDef(data)) {\n          invokeCreateHooks(vnode, insertedVnodeQueue);\n        }\n        insert(parentElm, vnode.elm, refElm);\n      }\n\n      if ( true && data && data.pre) {\n        creatingElmInVPre--;\n      }\n    } else if (isTrue(vnode.isComment)) {\n      vnode.elm = nodeOps.createComment(vnode.text);\n      insert(parentElm, vnode.elm, refElm);\n    } else {\n      vnode.elm = nodeOps.createTextNode(vnode.text);\n      insert(parentElm, vnode.elm, refElm);\n    }\n  }\n\n  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {\n    var i = vnode.data;\n    if (isDef(i)) {\n      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;\n      if (isDef(i = i.hook) && isDef(i = i.init)) {\n        i(vnode, false /* hydrating */);\n      }\n      // after calling the init hook, if the vnode is a child component\n      // it should've created a child instance and mounted it. the child\n      // component also has set the placeholder vnode's elm.\n      // in that case we can just return the element and be done.\n      if (isDef(vnode.componentInstance)) {\n        initComponent(vnode, insertedVnodeQueue);\n        insert(parentElm, vnode.elm, refElm);\n        if (isTrue(isReactivated)) {\n          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);\n        }\n        return true\n      }\n    }\n  }\n\n  function initComponent (vnode, insertedVnodeQueue) {\n    if (isDef(vnode.data.pendingInsert)) {\n      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);\n      vnode.data.pendingInsert = null;\n    }\n    vnode.elm = vnode.componentInstance.$el;\n    if (isPatchable(vnode)) {\n      invokeCreateHooks(vnode, insertedVnodeQueue);\n      setScope(vnode);\n    } else {\n      // empty component root.\n      // skip all element-related modules except for ref (#3455)\n      registerRef(vnode);\n      // make sure to invoke the insert hook\n      insertedVnodeQueue.push(vnode);\n    }\n  }\n\n  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {\n    var i;\n    // hack for #4339: a reactivated component with inner transition\n    // does not trigger because the inner node's created hooks are not called\n    // again. It's not ideal to involve module-specific logic in here but\n    // there doesn't seem to be a better way to do it.\n    var innerNode = vnode;\n    while (innerNode.componentInstance) {\n      innerNode = innerNode.componentInstance._vnode;\n      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {\n        for (i = 0; i < cbs.activate.length; ++i) {\n          cbs.activate[i](emptyNode, innerNode);\n        }\n        insertedVnodeQueue.push(innerNode);\n        break\n      }\n    }\n    // unlike a newly created component,\n    // a reactivated keep-alive component doesn't insert itself\n    insert(parentElm, vnode.elm, refElm);\n  }\n\n  function insert (parent, elm, ref$$1) {\n    if (isDef(parent)) {\n      if (isDef(ref$$1)) {\n        if (nodeOps.parentNode(ref$$1) === parent) {\n          nodeOps.insertBefore(parent, elm, ref$$1);\n        }\n      } else {\n        nodeOps.appendChild(parent, elm);\n      }\n    }\n  }\n\n  function createChildren (vnode, children, insertedVnodeQueue) {\n    if (Array.isArray(children)) {\n      if (true) {\n        checkDuplicateKeys(children);\n      }\n      for (var i = 0; i < children.length; ++i) {\n        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true, children, i);\n      }\n    } else if (isPrimitive(vnode.text)) {\n      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)));\n    }\n  }\n\n  function isPatchable (vnode) {\n    while (vnode.componentInstance) {\n      vnode = vnode.componentInstance._vnode;\n    }\n    return isDef(vnode.tag)\n  }\n\n  function invokeCreateHooks (vnode, insertedVnodeQueue) {\n    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {\n      cbs.create[i$1](emptyNode, vnode);\n    }\n    i = vnode.data.hook; // Reuse variable\n    if (isDef(i)) {\n      if (isDef(i.create)) { i.create(emptyNode, vnode); }\n      if (isDef(i.insert)) { insertedVnodeQueue.push(vnode); }\n    }\n  }\n\n  // set scope id attribute for scoped CSS.\n  // this is implemented as a special case to avoid the overhead\n  // of going through the normal attribute patching process.\n  function setScope (vnode) {\n    var i;\n    if (isDef(i = vnode.fnScopeId)) {\n      nodeOps.setStyleScope(vnode.elm, i);\n    } else {\n      var ancestor = vnode;\n      while (ancestor) {\n        if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {\n          nodeOps.setStyleScope(vnode.elm, i);\n        }\n        ancestor = ancestor.parent;\n      }\n    }\n    // for slot content they should also get the scopeId from the host instance.\n    if (isDef(i = activeInstance) &&\n      i !== vnode.context &&\n      i !== vnode.fnContext &&\n      isDef(i = i.$options._scopeId)\n    ) {\n      nodeOps.setStyleScope(vnode.elm, i);\n    }\n  }\n\n  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {\n    for (; startIdx <= endIdx; ++startIdx) {\n      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm, false, vnodes, startIdx);\n    }\n  }\n\n  function invokeDestroyHook (vnode) {\n    var i, j;\n    var data = vnode.data;\n    if (isDef(data)) {\n      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }\n      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }\n    }\n    if (isDef(i = vnode.children)) {\n      for (j = 0; j < vnode.children.length; ++j) {\n        invokeDestroyHook(vnode.children[j]);\n      }\n    }\n  }\n\n  function removeVnodes (parentElm, vnodes, startIdx, endIdx) {\n    for (; startIdx <= endIdx; ++startIdx) {\n      var ch = vnodes[startIdx];\n      if (isDef(ch)) {\n        if (isDef(ch.tag)) {\n          removeAndInvokeRemoveHook(ch);\n          invokeDestroyHook(ch);\n        } else { // Text node\n          removeNode(ch.elm);\n        }\n      }\n    }\n  }\n\n  function removeAndInvokeRemoveHook (vnode, rm) {\n    if (isDef(rm) || isDef(vnode.data)) {\n      var i;\n      var listeners = cbs.remove.length + 1;\n      if (isDef(rm)) {\n        // we have a recursively passed down rm callback\n        // increase the listeners count\n        rm.listeners += listeners;\n      } else {\n        // directly removing\n        rm = createRmCb(vnode.elm, listeners);\n      }\n      // recursively invoke hooks on child component root node\n      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {\n        removeAndInvokeRemoveHook(i, rm);\n      }\n      for (i = 0; i < cbs.remove.length; ++i) {\n        cbs.remove[i](vnode, rm);\n      }\n      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {\n        i(vnode, rm);\n      } else {\n        rm();\n      }\n    } else {\n      removeNode(vnode.elm);\n    }\n  }\n\n  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {\n    var oldStartIdx = 0;\n    var newStartIdx = 0;\n    var oldEndIdx = oldCh.length - 1;\n    var oldStartVnode = oldCh[0];\n    var oldEndVnode = oldCh[oldEndIdx];\n    var newEndIdx = newCh.length - 1;\n    var newStartVnode = newCh[0];\n    var newEndVnode = newCh[newEndIdx];\n    var oldKeyToIdx, idxInOld, vnodeToMove, refElm;\n\n    // removeOnly is a special flag used only by <transition-group>\n    // to ensure removed elements stay in correct relative positions\n    // during leaving transitions\n    var canMove = !removeOnly;\n\n    if (true) {\n      checkDuplicateKeys(newCh);\n    }\n\n    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {\n      if (isUndef(oldStartVnode)) {\n        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left\n      } else if (isUndef(oldEndVnode)) {\n        oldEndVnode = oldCh[--oldEndIdx];\n      } else if (sameVnode(oldStartVnode, newStartVnode)) {\n        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);\n        oldStartVnode = oldCh[++oldStartIdx];\n        newStartVnode = newCh[++newStartIdx];\n      } else if (sameVnode(oldEndVnode, newEndVnode)) {\n        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);\n        oldEndVnode = oldCh[--oldEndIdx];\n        newEndVnode = newCh[--newEndIdx];\n      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right\n        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);\n        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));\n        oldStartVnode = oldCh[++oldStartIdx];\n        newEndVnode = newCh[--newEndIdx];\n      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left\n        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);\n        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);\n        oldEndVnode = oldCh[--oldEndIdx];\n        newStartVnode = newCh[++newStartIdx];\n      } else {\n        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }\n        idxInOld = isDef(newStartVnode.key)\n          ? oldKeyToIdx[newStartVnode.key]\n          : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);\n        if (isUndef(idxInOld)) { // New element\n          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);\n        } else {\n          vnodeToMove = oldCh[idxInOld];\n          if (sameVnode(vnodeToMove, newStartVnode)) {\n            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);\n            oldCh[idxInOld] = undefined;\n            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);\n          } else {\n            // same key but different element. treat as new element\n            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);\n          }\n        }\n        newStartVnode = newCh[++newStartIdx];\n      }\n    }\n    if (oldStartIdx > oldEndIdx) {\n      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;\n      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);\n    } else if (newStartIdx > newEndIdx) {\n      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);\n    }\n  }\n\n  function checkDuplicateKeys (children) {\n    var seenKeys = {};\n    for (var i = 0; i < children.length; i++) {\n      var vnode = children[i];\n      var key = vnode.key;\n      if (isDef(key)) {\n        if (seenKeys[key]) {\n          warn(\n            (\"Duplicate keys detected: '\" + key + \"'. This may cause an update error.\"),\n            vnode.context\n          );\n        } else {\n          seenKeys[key] = true;\n        }\n      }\n    }\n  }\n\n  function findIdxInOld (node, oldCh, start, end) {\n    for (var i = start; i < end; i++) {\n      var c = oldCh[i];\n      if (isDef(c) && sameVnode(node, c)) { return i }\n    }\n  }\n\n  function patchVnode (\n    oldVnode,\n    vnode,\n    insertedVnodeQueue,\n    ownerArray,\n    index,\n    removeOnly\n  ) {\n    if (oldVnode === vnode) {\n      return\n    }\n\n    if (isDef(vnode.elm) && isDef(ownerArray)) {\n      // clone reused vnode\n      vnode = ownerArray[index] = cloneVNode(vnode);\n    }\n\n    var elm = vnode.elm = oldVnode.elm;\n\n    if (isTrue(oldVnode.isAsyncPlaceholder)) {\n      if (isDef(vnode.asyncFactory.resolved)) {\n        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);\n      } else {\n        vnode.isAsyncPlaceholder = true;\n      }\n      return\n    }\n\n    // reuse element for static trees.\n    // note we only do this if the vnode is cloned -\n    // if the new node is not cloned it means the render functions have been\n    // reset by the hot-reload-api and we need to do a proper re-render.\n    if (isTrue(vnode.isStatic) &&\n      isTrue(oldVnode.isStatic) &&\n      vnode.key === oldVnode.key &&\n      (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))\n    ) {\n      vnode.componentInstance = oldVnode.componentInstance;\n      return\n    }\n\n    var i;\n    var data = vnode.data;\n    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {\n      i(oldVnode, vnode);\n    }\n\n    var oldCh = oldVnode.children;\n    var ch = vnode.children;\n    if (isDef(data) && isPatchable(vnode)) {\n      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }\n      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }\n    }\n    if (isUndef(vnode.text)) {\n      if (isDef(oldCh) && isDef(ch)) {\n        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }\n      } else if (isDef(ch)) {\n        if (true) {\n          checkDuplicateKeys(ch);\n        }\n        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }\n        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);\n      } else if (isDef(oldCh)) {\n        removeVnodes(elm, oldCh, 0, oldCh.length - 1);\n      } else if (isDef(oldVnode.text)) {\n        nodeOps.setTextContent(elm, '');\n      }\n    } else if (oldVnode.text !== vnode.text) {\n      nodeOps.setTextContent(elm, vnode.text);\n    }\n    if (isDef(data)) {\n      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }\n    }\n  }\n\n  function invokeInsertHook (vnode, queue, initial) {\n    // delay insert hooks for component root nodes, invoke them after the\n    // element is really inserted\n    if (isTrue(initial) && isDef(vnode.parent)) {\n      vnode.parent.data.pendingInsert = queue;\n    } else {\n      for (var i = 0; i < queue.length; ++i) {\n        queue[i].data.hook.insert(queue[i]);\n      }\n    }\n  }\n\n  var hydrationBailed = false;\n  // list of modules that can skip create hook during hydration because they\n  // are already rendered on the client or has no need for initialization\n  // Note: style is excluded because it relies on initial clone for future\n  // deep updates (#7063).\n  var isRenderedModule = makeMap('attrs,class,staticClass,staticStyle,key');\n\n  // Note: this is a browser-only function so we can assume elms are DOM nodes.\n  function hydrate (elm, vnode, insertedVnodeQueue, inVPre) {\n    var i;\n    var tag = vnode.tag;\n    var data = vnode.data;\n    var children = vnode.children;\n    inVPre = inVPre || (data && data.pre);\n    vnode.elm = elm;\n\n    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {\n      vnode.isAsyncPlaceholder = true;\n      return true\n    }\n    // assert node match\n    if (true) {\n      if (!assertNodeMatch(elm, vnode, inVPre)) {\n        return false\n      }\n    }\n    if (isDef(data)) {\n      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }\n      if (isDef(i = vnode.componentInstance)) {\n        // child component. it should have hydrated its own tree.\n        initComponent(vnode, insertedVnodeQueue);\n        return true\n      }\n    }\n    if (isDef(tag)) {\n      if (isDef(children)) {\n        // empty element, allow client to pick up and populate children\n        if (!elm.hasChildNodes()) {\n          createChildren(vnode, children, insertedVnodeQueue);\n        } else {\n          // v-html and domProps: innerHTML\n          if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {\n            if (i !== elm.innerHTML) {\n              /* istanbul ignore if */\n              if ( true &&\n                typeof console !== 'undefined' &&\n                !hydrationBailed\n              ) {\n                hydrationBailed = true;\n                console.warn('Parent: ', elm);\n                console.warn('server innerHTML: ', i);\n                console.warn('client innerHTML: ', elm.innerHTML);\n              }\n              return false\n            }\n          } else {\n            // iterate and compare children lists\n            var childrenMatch = true;\n            var childNode = elm.firstChild;\n            for (var i$1 = 0; i$1 < children.length; i$1++) {\n              if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue, inVPre)) {\n                childrenMatch = false;\n                break\n              }\n              childNode = childNode.nextSibling;\n            }\n            // if childNode is not null, it means the actual childNodes list is\n            // longer than the virtual children list.\n            if (!childrenMatch || childNode) {\n              /* istanbul ignore if */\n              if ( true &&\n                typeof console !== 'undefined' &&\n                !hydrationBailed\n              ) {\n                hydrationBailed = true;\n                console.warn('Parent: ', elm);\n                console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);\n              }\n              return false\n            }\n          }\n        }\n      }\n      if (isDef(data)) {\n        var fullInvoke = false;\n        for (var key in data) {\n          if (!isRenderedModule(key)) {\n            fullInvoke = true;\n            invokeCreateHooks(vnode, insertedVnodeQueue);\n            break\n          }\n        }\n        if (!fullInvoke && data['class']) {\n          // ensure collecting deps for deep class bindings for future updates\n          traverse(data['class']);\n        }\n      }\n    } else if (elm.data !== vnode.text) {\n      elm.data = vnode.text;\n    }\n    return true\n  }\n\n  function assertNodeMatch (node, vnode, inVPre) {\n    if (isDef(vnode.tag)) {\n      return vnode.tag.indexOf('vue-component') === 0 || (\n        !isUnknownElement$$1(vnode, inVPre) &&\n        vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())\n      )\n    } else {\n      return node.nodeType === (vnode.isComment ? 8 : 3)\n    }\n  }\n\n  return function patch (oldVnode, vnode, hydrating, removeOnly) {\n    if (isUndef(vnode)) {\n      if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }\n      return\n    }\n\n    var isInitialPatch = false;\n    var insertedVnodeQueue = [];\n\n    if (isUndef(oldVnode)) {\n      // empty mount (likely as component), create new root element\n      isInitialPatch = true;\n      createElm(vnode, insertedVnodeQueue);\n    } else {\n      var isRealElement = isDef(oldVnode.nodeType);\n      if (!isRealElement && sameVnode(oldVnode, vnode)) {\n        // patch existing root node\n        patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly);\n      } else {\n        if (isRealElement) {\n          // mounting to a real element\n          // check if this is server-rendered content and if we can perform\n          // a successful hydration.\n          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {\n            oldVnode.removeAttribute(SSR_ATTR);\n            hydrating = true;\n          }\n          if (isTrue(hydrating)) {\n            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {\n              invokeInsertHook(vnode, insertedVnodeQueue, true);\n              return oldVnode\n            } else if (true) {\n              warn(\n                'The client-side rendered virtual DOM tree is not matching ' +\n                'server-rendered content. This is likely caused by incorrect ' +\n                'HTML markup, for example nesting block-level elements inside ' +\n                '<p>, or missing <tbody>. Bailing hydration and performing ' +\n                'full client-side render.'\n              );\n            }\n          }\n          // either not server-rendered, or hydration failed.\n          // create an empty node and replace it\n          oldVnode = emptyNodeAt(oldVnode);\n        }\n\n        // replacing existing element\n        var oldElm = oldVnode.elm;\n        var parentElm = nodeOps.parentNode(oldElm);\n\n        // create new node\n        createElm(\n          vnode,\n          insertedVnodeQueue,\n          // extremely rare edge case: do not insert if old element is in a\n          // leaving transition. Only happens when combining transition +\n          // keep-alive + HOCs. (#4590)\n          oldElm._leaveCb ? null : parentElm,\n          nodeOps.nextSibling(oldElm)\n        );\n\n        // update parent placeholder node element, recursively\n        if (isDef(vnode.parent)) {\n          var ancestor = vnode.parent;\n          var patchable = isPatchable(vnode);\n          while (ancestor) {\n            for (var i = 0; i < cbs.destroy.length; ++i) {\n              cbs.destroy[i](ancestor);\n            }\n            ancestor.elm = vnode.elm;\n            if (patchable) {\n              for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {\n                cbs.create[i$1](emptyNode, ancestor);\n              }\n              // #6513\n              // invoke insert hooks that may have been merged by create hooks.\n              // e.g. for directives that uses the \"inserted\" hook.\n              var insert = ancestor.data.hook.insert;\n              if (insert.merged) {\n                // start at index 1 to avoid re-invoking component mounted hook\n                for (var i$2 = 1; i$2 < insert.fns.length; i$2++) {\n                  insert.fns[i$2]();\n                }\n              }\n            } else {\n              registerRef(ancestor);\n            }\n            ancestor = ancestor.parent;\n          }\n        }\n\n        // destroy old node\n        if (isDef(parentElm)) {\n          removeVnodes(parentElm, [oldVnode], 0, 0);\n        } else if (isDef(oldVnode.tag)) {\n          invokeDestroyHook(oldVnode);\n        }\n      }\n    }\n\n    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);\n    return vnode.elm\n  }\n}\n\n/*  */\n\nvar directives = {\n  create: updateDirectives,\n  update: updateDirectives,\n  destroy: function unbindDirectives (vnode) {\n    updateDirectives(vnode, emptyNode);\n  }\n};\n\nfunction updateDirectives (oldVnode, vnode) {\n  if (oldVnode.data.directives || vnode.data.directives) {\n    _update(oldVnode, vnode);\n  }\n}\n\nfunction _update (oldVnode, vnode) {\n  var isCreate = oldVnode === emptyNode;\n  var isDestroy = vnode === emptyNode;\n  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);\n  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);\n\n  var dirsWithInsert = [];\n  var dirsWithPostpatch = [];\n\n  var key, oldDir, dir;\n  for (key in newDirs) {\n    oldDir = oldDirs[key];\n    dir = newDirs[key];\n    if (!oldDir) {\n      // new directive, bind\n      callHook$1(dir, 'bind', vnode, oldVnode);\n      if (dir.def && dir.def.inserted) {\n        dirsWithInsert.push(dir);\n      }\n    } else {\n      // existing directive, update\n      dir.oldValue = oldDir.value;\n      dir.oldArg = oldDir.arg;\n      callHook$1(dir, 'update', vnode, oldVnode);\n      if (dir.def && dir.def.componentUpdated) {\n        dirsWithPostpatch.push(dir);\n      }\n    }\n  }\n\n  if (dirsWithInsert.length) {\n    var callInsert = function () {\n      for (var i = 0; i < dirsWithInsert.length; i++) {\n        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);\n      }\n    };\n    if (isCreate) {\n      mergeVNodeHook(vnode, 'insert', callInsert);\n    } else {\n      callInsert();\n    }\n  }\n\n  if (dirsWithPostpatch.length) {\n    mergeVNodeHook(vnode, 'postpatch', function () {\n      for (var i = 0; i < dirsWithPostpatch.length; i++) {\n        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);\n      }\n    });\n  }\n\n  if (!isCreate) {\n    for (key in oldDirs) {\n      if (!newDirs[key]) {\n        // no longer present, unbind\n        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);\n      }\n    }\n  }\n}\n\nvar emptyModifiers = Object.create(null);\n\nfunction normalizeDirectives$1 (\n  dirs,\n  vm\n) {\n  var res = Object.create(null);\n  if (!dirs) {\n    // $flow-disable-line\n    return res\n  }\n  var i, dir;\n  for (i = 0; i < dirs.length; i++) {\n    dir = dirs[i];\n    if (!dir.modifiers) {\n      // $flow-disable-line\n      dir.modifiers = emptyModifiers;\n    }\n    res[getRawDirName(dir)] = dir;\n    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);\n  }\n  // $flow-disable-line\n  return res\n}\n\nfunction getRawDirName (dir) {\n  return dir.rawName || ((dir.name) + \".\" + (Object.keys(dir.modifiers || {}).join('.')))\n}\n\nfunction callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {\n  var fn = dir.def && dir.def[hook];\n  if (fn) {\n    try {\n      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);\n    } catch (e) {\n      handleError(e, vnode.context, (\"directive \" + (dir.name) + \" \" + hook + \" hook\"));\n    }\n  }\n}\n\nvar baseModules = [\n  ref,\n  directives\n];\n\n/*  */\n\nfunction updateAttrs (oldVnode, vnode) {\n  var opts = vnode.componentOptions;\n  if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {\n    return\n  }\n  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {\n    return\n  }\n  var key, cur, old;\n  var elm = vnode.elm;\n  var oldAttrs = oldVnode.data.attrs || {};\n  var attrs = vnode.data.attrs || {};\n  // clone observed objects, as the user probably wants to mutate it\n  if (isDef(attrs.__ob__)) {\n    attrs = vnode.data.attrs = extend({}, attrs);\n  }\n\n  for (key in attrs) {\n    cur = attrs[key];\n    old = oldAttrs[key];\n    if (old !== cur) {\n      setAttr(elm, key, cur);\n    }\n  }\n  // #4391: in IE9, setting type can reset value for input[type=radio]\n  // #6666: IE/Edge forces progress value down to 1 before setting a max\n  /* istanbul ignore if */\n  if ((isIE || isEdge) && attrs.value !== oldAttrs.value) {\n    setAttr(elm, 'value', attrs.value);\n  }\n  for (key in oldAttrs) {\n    if (isUndef(attrs[key])) {\n      if (isXlink(key)) {\n        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));\n      } else if (!isEnumeratedAttr(key)) {\n        elm.removeAttribute(key);\n      }\n    }\n  }\n}\n\nfunction setAttr (el, key, value) {\n  if (el.tagName.indexOf('-') > -1) {\n    baseSetAttr(el, key, value);\n  } else if (isBooleanAttr(key)) {\n    // set attribute for blank value\n    // e.g. <option disabled>Select one</option>\n    if (isFalsyAttrValue(value)) {\n      el.removeAttribute(key);\n    } else {\n      // technically allowfullscreen is a boolean attribute for <iframe>,\n      // but Flash expects a value of \"true\" when used on <embed> tag\n      value = key === 'allowfullscreen' && el.tagName === 'EMBED'\n        ? 'true'\n        : key;\n      el.setAttribute(key, value);\n    }\n  } else if (isEnumeratedAttr(key)) {\n    el.setAttribute(key, convertEnumeratedValue(key, value));\n  } else if (isXlink(key)) {\n    if (isFalsyAttrValue(value)) {\n      el.removeAttributeNS(xlinkNS, getXlinkProp(key));\n    } else {\n      el.setAttributeNS(xlinkNS, key, value);\n    }\n  } else {\n    baseSetAttr(el, key, value);\n  }\n}\n\nfunction baseSetAttr (el, key, value) {\n  if (isFalsyAttrValue(value)) {\n    el.removeAttribute(key);\n  } else {\n    // #7138: IE10 & 11 fires input event when setting placeholder on\n    // <textarea>... block the first input event and remove the blocker\n    // immediately.\n    /* istanbul ignore if */\n    if (\n      isIE && !isIE9 &&\n      el.tagName === 'TEXTAREA' &&\n      key === 'placeholder' && value !== '' && !el.__ieph\n    ) {\n      var blocker = function (e) {\n        e.stopImmediatePropagation();\n        el.removeEventListener('input', blocker);\n      };\n      el.addEventListener('input', blocker);\n      // $flow-disable-line\n      el.__ieph = true; /* IE placeholder patched */\n    }\n    el.setAttribute(key, value);\n  }\n}\n\nvar attrs = {\n  create: updateAttrs,\n  update: updateAttrs\n};\n\n/*  */\n\nfunction updateClass (oldVnode, vnode) {\n  var el = vnode.elm;\n  var data = vnode.data;\n  var oldData = oldVnode.data;\n  if (\n    isUndef(data.staticClass) &&\n    isUndef(data.class) && (\n      isUndef(oldData) || (\n        isUndef(oldData.staticClass) &&\n        isUndef(oldData.class)\n      )\n    )\n  ) {\n    return\n  }\n\n  var cls = genClassForVnode(vnode);\n\n  // handle transition classes\n  var transitionClass = el._transitionClasses;\n  if (isDef(transitionClass)) {\n    cls = concat(cls, stringifyClass(transitionClass));\n  }\n\n  // set the class\n  if (cls !== el._prevClass) {\n    el.setAttribute('class', cls);\n    el._prevClass = cls;\n  }\n}\n\nvar klass = {\n  create: updateClass,\n  update: updateClass\n};\n\n/*  */\n\n/*  */\n\n/*  */\n\n/*  */\n\n// in some cases, the event used has to be determined at runtime\n// so we used some reserved tokens during compile.\nvar RANGE_TOKEN = '__r';\nvar CHECKBOX_RADIO_TOKEN = '__c';\n\n/*  */\n\n// normalize v-model event tokens that can only be determined at runtime.\n// it's important to place the event as the first in the array because\n// the whole point is ensuring the v-model callback gets called before\n// user-attached handlers.\nfunction normalizeEvents (on) {\n  /* istanbul ignore if */\n  if (isDef(on[RANGE_TOKEN])) {\n    // IE input[type=range] only supports `change` event\n    var event = isIE ? 'change' : 'input';\n    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);\n    delete on[RANGE_TOKEN];\n  }\n  // This was originally intended to fix #4521 but no longer necessary\n  // after 2.5. Keeping it for backwards compat with generated code from < 2.4\n  /* istanbul ignore if */\n  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {\n    on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);\n    delete on[CHECKBOX_RADIO_TOKEN];\n  }\n}\n\nvar target$1;\n\nfunction createOnceHandler$1 (event, handler, capture) {\n  var _target = target$1; // save current target element in closure\n  return function onceHandler () {\n    var res = handler.apply(null, arguments);\n    if (res !== null) {\n      remove$2(event, onceHandler, capture, _target);\n    }\n  }\n}\n\n// #9446: Firefox <= 53 (in particular, ESR 52) has incorrect Event.timeStamp\n// implementation and does not fire microtasks in between event propagation, so\n// safe to exclude.\nvar useMicrotaskFix = isUsingMicroTask && !(isFF && Number(isFF[1]) <= 53);\n\nfunction add$1 (\n  name,\n  handler,\n  capture,\n  passive\n) {\n  // async edge case #6566: inner click event triggers patch, event handler\n  // attached to outer element during patch, and triggered again. This\n  // happens because browsers fire microtask ticks between event propagation.\n  // the solution is simple: we save the timestamp when a handler is attached,\n  // and the handler would only fire if the event passed to it was fired\n  // AFTER it was attached.\n  if (useMicrotaskFix) {\n    var attachedTimestamp = currentFlushTimestamp;\n    var original = handler;\n    handler = original._wrapper = function (e) {\n      if (\n        // no bubbling, should always fire.\n        // this is just a safety net in case event.timeStamp is unreliable in\n        // certain weird environments...\n        e.target === e.currentTarget ||\n        // event is fired after handler attachment\n        e.timeStamp >= attachedTimestamp ||\n        // bail for environments that have buggy event.timeStamp implementations\n        // #9462 iOS 9 bug: event.timeStamp is 0 after history.pushState\n        // #9681 QtWebEngine event.timeStamp is negative value\n        e.timeStamp <= 0 ||\n        // #9448 bail if event is fired in another document in a multi-page\n        // electron/nw.js app, since event.timeStamp will be using a different\n        // starting reference\n        e.target.ownerDocument !== document\n      ) {\n        return original.apply(this, arguments)\n      }\n    };\n  }\n  target$1.addEventListener(\n    name,\n    handler,\n    supportsPassive\n      ? { capture: capture, passive: passive }\n      : capture\n  );\n}\n\nfunction remove$2 (\n  name,\n  handler,\n  capture,\n  _target\n) {\n  (_target || target$1).removeEventListener(\n    name,\n    handler._wrapper || handler,\n    capture\n  );\n}\n\nfunction updateDOMListeners (oldVnode, vnode) {\n  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {\n    return\n  }\n  var on = vnode.data.on || {};\n  var oldOn = oldVnode.data.on || {};\n  target$1 = vnode.elm;\n  normalizeEvents(on);\n  updateListeners(on, oldOn, add$1, remove$2, createOnceHandler$1, vnode.context);\n  target$1 = undefined;\n}\n\nvar events = {\n  create: updateDOMListeners,\n  update: updateDOMListeners\n};\n\n/*  */\n\nvar svgContainer;\n\nfunction updateDOMProps (oldVnode, vnode) {\n  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {\n    return\n  }\n  var key, cur;\n  var elm = vnode.elm;\n  var oldProps = oldVnode.data.domProps || {};\n  var props = vnode.data.domProps || {};\n  // clone observed objects, as the user probably wants to mutate it\n  if (isDef(props.__ob__)) {\n    props = vnode.data.domProps = extend({}, props);\n  }\n\n  for (key in oldProps) {\n    if (!(key in props)) {\n      elm[key] = '';\n    }\n  }\n\n  for (key in props) {\n    cur = props[key];\n    // ignore children if the node has textContent or innerHTML,\n    // as these will throw away existing DOM nodes and cause removal errors\n    // on subsequent patches (#3360)\n    if (key === 'textContent' || key === 'innerHTML') {\n      if (vnode.children) { vnode.children.length = 0; }\n      if (cur === oldProps[key]) { continue }\n      // #6601 work around Chrome version <= 55 bug where single textNode\n      // replaced by innerHTML/textContent retains its parentNode property\n      if (elm.childNodes.length === 1) {\n        elm.removeChild(elm.childNodes[0]);\n      }\n    }\n\n    if (key === 'value' && elm.tagName !== 'PROGRESS') {\n      // store value as _value as well since\n      // non-string values will be stringified\n      elm._value = cur;\n      // avoid resetting cursor position when value is the same\n      var strCur = isUndef(cur) ? '' : String(cur);\n      if (shouldUpdateValue(elm, strCur)) {\n        elm.value = strCur;\n      }\n    } else if (key === 'innerHTML' && isSVG(elm.tagName) && isUndef(elm.innerHTML)) {\n      // IE doesn't support innerHTML for SVG elements\n      svgContainer = svgContainer || document.createElement('div');\n      svgContainer.innerHTML = \"<svg>\" + cur + \"</svg>\";\n      var svg = svgContainer.firstChild;\n      while (elm.firstChild) {\n        elm.removeChild(elm.firstChild);\n      }\n      while (svg.firstChild) {\n        elm.appendChild(svg.firstChild);\n      }\n    } else if (\n      // skip the update if old and new VDOM state is the same.\n      // `value` is handled separately because the DOM value may be temporarily\n      // out of sync with VDOM state due to focus, composition and modifiers.\n      // This  #4521 by skipping the unnecesarry `checked` update.\n      cur !== oldProps[key]\n    ) {\n      // some property updates can throw\n      // e.g. `value` on <progress> w/ non-finite value\n      try {\n        elm[key] = cur;\n      } catch (e) {}\n    }\n  }\n}\n\n// check platforms/web/util/attrs.js acceptValue\n\n\nfunction shouldUpdateValue (elm, checkVal) {\n  return (!elm.composing && (\n    elm.tagName === 'OPTION' ||\n    isNotInFocusAndDirty(elm, checkVal) ||\n    isDirtyWithModifiers(elm, checkVal)\n  ))\n}\n\nfunction isNotInFocusAndDirty (elm, checkVal) {\n  // return true when textbox (.number and .trim) loses focus and its value is\n  // not equal to the updated value\n  var notInFocus = true;\n  // #6157\n  // work around IE bug when accessing document.activeElement in an iframe\n  try { notInFocus = document.activeElement !== elm; } catch (e) {}\n  return notInFocus && elm.value !== checkVal\n}\n\nfunction isDirtyWithModifiers (elm, newVal) {\n  var value = elm.value;\n  var modifiers = elm._vModifiers; // injected by v-model runtime\n  if (isDef(modifiers)) {\n    if (modifiers.number) {\n      return toNumber(value) !== toNumber(newVal)\n    }\n    if (modifiers.trim) {\n      return value.trim() !== newVal.trim()\n    }\n  }\n  return value !== newVal\n}\n\nvar domProps = {\n  create: updateDOMProps,\n  update: updateDOMProps\n};\n\n/*  */\n\nvar parseStyleText = cached(function (cssText) {\n  var res = {};\n  var listDelimiter = /;(?![^(]*\\))/g;\n  var propertyDelimiter = /:(.+)/;\n  cssText.split(listDelimiter).forEach(function (item) {\n    if (item) {\n      var tmp = item.split(propertyDelimiter);\n      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());\n    }\n  });\n  return res\n});\n\n// merge static and dynamic style data on the same vnode\nfunction normalizeStyleData (data) {\n  var style = normalizeStyleBinding(data.style);\n  // static style is pre-processed into an object during compilation\n  // and is always a fresh object, so it's safe to merge into it\n  return data.staticStyle\n    ? extend(data.staticStyle, style)\n    : style\n}\n\n// normalize possible array / string values into Object\nfunction normalizeStyleBinding (bindingStyle) {\n  if (Array.isArray(bindingStyle)) {\n    return toObject(bindingStyle)\n  }\n  if (typeof bindingStyle === 'string') {\n    return parseStyleText(bindingStyle)\n  }\n  return bindingStyle\n}\n\n/**\n * parent component style should be after child's\n * so that parent component's style could override it\n */\nfunction getStyle (vnode, checkChild) {\n  var res = {};\n  var styleData;\n\n  if (checkChild) {\n    var childNode = vnode;\n    while (childNode.componentInstance) {\n      childNode = childNode.componentInstance._vnode;\n      if (\n        childNode && childNode.data &&\n        (styleData = normalizeStyleData(childNode.data))\n      ) {\n        extend(res, styleData);\n      }\n    }\n  }\n\n  if ((styleData = normalizeStyleData(vnode.data))) {\n    extend(res, styleData);\n  }\n\n  var parentNode = vnode;\n  while ((parentNode = parentNode.parent)) {\n    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {\n      extend(res, styleData);\n    }\n  }\n  return res\n}\n\n/*  */\n\nvar cssVarRE = /^--/;\nvar importantRE = /\\s*!important$/;\nvar setProp = function (el, name, val) {\n  /* istanbul ignore if */\n  if (cssVarRE.test(name)) {\n    el.style.setProperty(name, val);\n  } else if (importantRE.test(val)) {\n    el.style.setProperty(hyphenate(name), val.replace(importantRE, ''), 'important');\n  } else {\n    var normalizedName = normalize(name);\n    if (Array.isArray(val)) {\n      // Support values array created by autoprefixer, e.g.\n      // {display: [\"-webkit-box\", \"-ms-flexbox\", \"flex\"]}\n      // Set them one by one, and the browser will only set those it can recognize\n      for (var i = 0, len = val.length; i < len; i++) {\n        el.style[normalizedName] = val[i];\n      }\n    } else {\n      el.style[normalizedName] = val;\n    }\n  }\n};\n\nvar vendorNames = ['Webkit', 'Moz', 'ms'];\n\nvar emptyStyle;\nvar normalize = cached(function (prop) {\n  emptyStyle = emptyStyle || document.createElement('div').style;\n  prop = camelize(prop);\n  if (prop !== 'filter' && (prop in emptyStyle)) {\n    return prop\n  }\n  var capName = prop.charAt(0).toUpperCase() + prop.slice(1);\n  for (var i = 0; i < vendorNames.length; i++) {\n    var name = vendorNames[i] + capName;\n    if (name in emptyStyle) {\n      return name\n    }\n  }\n});\n\nfunction updateStyle (oldVnode, vnode) {\n  var data = vnode.data;\n  var oldData = oldVnode.data;\n\n  if (isUndef(data.staticStyle) && isUndef(data.style) &&\n    isUndef(oldData.staticStyle) && isUndef(oldData.style)\n  ) {\n    return\n  }\n\n  var cur, name;\n  var el = vnode.elm;\n  var oldStaticStyle = oldData.staticStyle;\n  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};\n\n  // if static style exists, stylebinding already merged into it when doing normalizeStyleData\n  var oldStyle = oldStaticStyle || oldStyleBinding;\n\n  var style = normalizeStyleBinding(vnode.data.style) || {};\n\n  // store normalized style under a different key for next diff\n  // make sure to clone it if it's reactive, since the user likely wants\n  // to mutate it.\n  vnode.data.normalizedStyle = isDef(style.__ob__)\n    ? extend({}, style)\n    : style;\n\n  var newStyle = getStyle(vnode, true);\n\n  for (name in oldStyle) {\n    if (isUndef(newStyle[name])) {\n      setProp(el, name, '');\n    }\n  }\n  for (name in newStyle) {\n    cur = newStyle[name];\n    if (cur !== oldStyle[name]) {\n      // ie9 setting to null has no effect, must use empty string\n      setProp(el, name, cur == null ? '' : cur);\n    }\n  }\n}\n\nvar style = {\n  create: updateStyle,\n  update: updateStyle\n};\n\n/*  */\n\nvar whitespaceRE = /\\s+/;\n\n/**\n * Add class with compatibility for SVG since classList is not supported on\n * SVG elements in IE\n */\nfunction addClass (el, cls) {\n  /* istanbul ignore if */\n  if (!cls || !(cls = cls.trim())) {\n    return\n  }\n\n  /* istanbul ignore else */\n  if (el.classList) {\n    if (cls.indexOf(' ') > -1) {\n      cls.split(whitespaceRE).forEach(function (c) { return el.classList.add(c); });\n    } else {\n      el.classList.add(cls);\n    }\n  } else {\n    var cur = \" \" + (el.getAttribute('class') || '') + \" \";\n    if (cur.indexOf(' ' + cls + ' ') < 0) {\n      el.setAttribute('class', (cur + cls).trim());\n    }\n  }\n}\n\n/**\n * Remove class with compatibility for SVG since classList is not supported on\n * SVG elements in IE\n */\nfunction removeClass (el, cls) {\n  /* istanbul ignore if */\n  if (!cls || !(cls = cls.trim())) {\n    return\n  }\n\n  /* istanbul ignore else */\n  if (el.classList) {\n    if (cls.indexOf(' ') > -1) {\n      cls.split(whitespaceRE).forEach(function (c) { return el.classList.remove(c); });\n    } else {\n      el.classList.remove(cls);\n    }\n    if (!el.classList.length) {\n      el.removeAttribute('class');\n    }\n  } else {\n    var cur = \" \" + (el.getAttribute('class') || '') + \" \";\n    var tar = ' ' + cls + ' ';\n    while (cur.indexOf(tar) >= 0) {\n      cur = cur.replace(tar, ' ');\n    }\n    cur = cur.trim();\n    if (cur) {\n      el.setAttribute('class', cur);\n    } else {\n      el.removeAttribute('class');\n    }\n  }\n}\n\n/*  */\n\nfunction resolveTransition (def$$1) {\n  if (!def$$1) {\n    return\n  }\n  /* istanbul ignore else */\n  if (typeof def$$1 === 'object') {\n    var res = {};\n    if (def$$1.css !== false) {\n      extend(res, autoCssTransition(def$$1.name || 'v'));\n    }\n    extend(res, def$$1);\n    return res\n  } else if (typeof def$$1 === 'string') {\n    return autoCssTransition(def$$1)\n  }\n}\n\nvar autoCssTransition = cached(function (name) {\n  return {\n    enterClass: (name + \"-enter\"),\n    enterToClass: (name + \"-enter-to\"),\n    enterActiveClass: (name + \"-enter-active\"),\n    leaveClass: (name + \"-leave\"),\n    leaveToClass: (name + \"-leave-to\"),\n    leaveActiveClass: (name + \"-leave-active\")\n  }\n});\n\nvar hasTransition = inBrowser && !isIE9;\nvar TRANSITION = 'transition';\nvar ANIMATION = 'animation';\n\n// Transition property/event sniffing\nvar transitionProp = 'transition';\nvar transitionEndEvent = 'transitionend';\nvar animationProp = 'animation';\nvar animationEndEvent = 'animationend';\nif (hasTransition) {\n  /* istanbul ignore if */\n  if (window.ontransitionend === undefined &&\n    window.onwebkittransitionend !== undefined\n  ) {\n    transitionProp = 'WebkitTransition';\n    transitionEndEvent = 'webkitTransitionEnd';\n  }\n  if (window.onanimationend === undefined &&\n    window.onwebkitanimationend !== undefined\n  ) {\n    animationProp = 'WebkitAnimation';\n    animationEndEvent = 'webkitAnimationEnd';\n  }\n}\n\n// binding to window is necessary to make hot reload work in IE in strict mode\nvar raf = inBrowser\n  ? window.requestAnimationFrame\n    ? window.requestAnimationFrame.bind(window)\n    : setTimeout\n  : /* istanbul ignore next */ function (fn) { return fn(); };\n\nfunction nextFrame (fn) {\n  raf(function () {\n    raf(fn);\n  });\n}\n\nfunction addTransitionClass (el, cls) {\n  var transitionClasses = el._transitionClasses || (el._transitionClasses = []);\n  if (transitionClasses.indexOf(cls) < 0) {\n    transitionClasses.push(cls);\n    addClass(el, cls);\n  }\n}\n\nfunction removeTransitionClass (el, cls) {\n  if (el._transitionClasses) {\n    remove(el._transitionClasses, cls);\n  }\n  removeClass(el, cls);\n}\n\nfunction whenTransitionEnds (\n  el,\n  expectedType,\n  cb\n) {\n  var ref = getTransitionInfo(el, expectedType);\n  var type = ref.type;\n  var timeout = ref.timeout;\n  var propCount = ref.propCount;\n  if (!type) { return cb() }\n  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;\n  var ended = 0;\n  var end = function () {\n    el.removeEventListener(event, onEnd);\n    cb();\n  };\n  var onEnd = function (e) {\n    if (e.target === el) {\n      if (++ended >= propCount) {\n        end();\n      }\n    }\n  };\n  setTimeout(function () {\n    if (ended < propCount) {\n      end();\n    }\n  }, timeout + 1);\n  el.addEventListener(event, onEnd);\n}\n\nvar transformRE = /\\b(transform|all)(,|$)/;\n\nfunction getTransitionInfo (el, expectedType) {\n  var styles = window.getComputedStyle(el);\n  // JSDOM may return undefined for transition properties\n  var transitionDelays = (styles[transitionProp + 'Delay'] || '').split(', ');\n  var transitionDurations = (styles[transitionProp + 'Duration'] || '').split(', ');\n  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);\n  var animationDelays = (styles[animationProp + 'Delay'] || '').split(', ');\n  var animationDurations = (styles[animationProp + 'Duration'] || '').split(', ');\n  var animationTimeout = getTimeout(animationDelays, animationDurations);\n\n  var type;\n  var timeout = 0;\n  var propCount = 0;\n  /* istanbul ignore if */\n  if (expectedType === TRANSITION) {\n    if (transitionTimeout > 0) {\n      type = TRANSITION;\n      timeout = transitionTimeout;\n      propCount = transitionDurations.length;\n    }\n  } else if (expectedType === ANIMATION) {\n    if (animationTimeout > 0) {\n      type = ANIMATION;\n      timeout = animationTimeout;\n      propCount = animationDurations.length;\n    }\n  } else {\n    timeout = Math.max(transitionTimeout, animationTimeout);\n    type = timeout > 0\n      ? transitionTimeout > animationTimeout\n        ? TRANSITION\n        : ANIMATION\n      : null;\n    propCount = type\n      ? type === TRANSITION\n        ? transitionDurations.length\n        : animationDurations.length\n      : 0;\n  }\n  var hasTransform =\n    type === TRANSITION &&\n    transformRE.test(styles[transitionProp + 'Property']);\n  return {\n    type: type,\n    timeout: timeout,\n    propCount: propCount,\n    hasTransform: hasTransform\n  }\n}\n\nfunction getTimeout (delays, durations) {\n  /* istanbul ignore next */\n  while (delays.length < durations.length) {\n    delays = delays.concat(delays);\n  }\n\n  return Math.max.apply(null, durations.map(function (d, i) {\n    return toMs(d) + toMs(delays[i])\n  }))\n}\n\n// Old versions of Chromium (below 61.0.3163.100) formats floating pointer numbers\n// in a locale-dependent way, using a comma instead of a dot.\n// If comma is not replaced with a dot, the input will be rounded down (i.e. acting\n// as a floor function) causing unexpected behaviors\nfunction toMs (s) {\n  return Number(s.slice(0, -1).replace(',', '.')) * 1000\n}\n\n/*  */\n\nfunction enter (vnode, toggleDisplay) {\n  var el = vnode.elm;\n\n  // call leave callback now\n  if (isDef(el._leaveCb)) {\n    el._leaveCb.cancelled = true;\n    el._leaveCb();\n  }\n\n  var data = resolveTransition(vnode.data.transition);\n  if (isUndef(data)) {\n    return\n  }\n\n  /* istanbul ignore if */\n  if (isDef(el._enterCb) || el.nodeType !== 1) {\n    return\n  }\n\n  var css = data.css;\n  var type = data.type;\n  var enterClass = data.enterClass;\n  var enterToClass = data.enterToClass;\n  var enterActiveClass = data.enterActiveClass;\n  var appearClass = data.appearClass;\n  var appearToClass = data.appearToClass;\n  var appearActiveClass = data.appearActiveClass;\n  var beforeEnter = data.beforeEnter;\n  var enter = data.enter;\n  var afterEnter = data.afterEnter;\n  var enterCancelled = data.enterCancelled;\n  var beforeAppear = data.beforeAppear;\n  var appear = data.appear;\n  var afterAppear = data.afterAppear;\n  var appearCancelled = data.appearCancelled;\n  var duration = data.duration;\n\n  // activeInstance will always be the <transition> component managing this\n  // transition. One edge case to check is when the <transition> is placed\n  // as the root node of a child component. In that case we need to check\n  // <transition>'s parent for appear check.\n  var context = activeInstance;\n  var transitionNode = activeInstance.$vnode;\n  while (transitionNode && transitionNode.parent) {\n    context = transitionNode.context;\n    transitionNode = transitionNode.parent;\n  }\n\n  var isAppear = !context._isMounted || !vnode.isRootInsert;\n\n  if (isAppear && !appear && appear !== '') {\n    return\n  }\n\n  var startClass = isAppear && appearClass\n    ? appearClass\n    : enterClass;\n  var activeClass = isAppear && appearActiveClass\n    ? appearActiveClass\n    : enterActiveClass;\n  var toClass = isAppear && appearToClass\n    ? appearToClass\n    : enterToClass;\n\n  var beforeEnterHook = isAppear\n    ? (beforeAppear || beforeEnter)\n    : beforeEnter;\n  var enterHook = isAppear\n    ? (typeof appear === 'function' ? appear : enter)\n    : enter;\n  var afterEnterHook = isAppear\n    ? (afterAppear || afterEnter)\n    : afterEnter;\n  var enterCancelledHook = isAppear\n    ? (appearCancelled || enterCancelled)\n    : enterCancelled;\n\n  var explicitEnterDuration = toNumber(\n    isObject(duration)\n      ? duration.enter\n      : duration\n  );\n\n  if ( true && explicitEnterDuration != null) {\n    checkDuration(explicitEnterDuration, 'enter', vnode);\n  }\n\n  var expectsCSS = css !== false && !isIE9;\n  var userWantsControl = getHookArgumentsLength(enterHook);\n\n  var cb = el._enterCb = once(function () {\n    if (expectsCSS) {\n      removeTransitionClass(el, toClass);\n      removeTransitionClass(el, activeClass);\n    }\n    if (cb.cancelled) {\n      if (expectsCSS) {\n        removeTransitionClass(el, startClass);\n      }\n      enterCancelledHook && enterCancelledHook(el);\n    } else {\n      afterEnterHook && afterEnterHook(el);\n    }\n    el._enterCb = null;\n  });\n\n  if (!vnode.data.show) {\n    // remove pending leave element on enter by injecting an insert hook\n    mergeVNodeHook(vnode, 'insert', function () {\n      var parent = el.parentNode;\n      var pendingNode = parent && parent._pending && parent._pending[vnode.key];\n      if (pendingNode &&\n        pendingNode.tag === vnode.tag &&\n        pendingNode.elm._leaveCb\n      ) {\n        pendingNode.elm._leaveCb();\n      }\n      enterHook && enterHook(el, cb);\n    });\n  }\n\n  // start enter transition\n  beforeEnterHook && beforeEnterHook(el);\n  if (expectsCSS) {\n    addTransitionClass(el, startClass);\n    addTransitionClass(el, activeClass);\n    nextFrame(function () {\n      removeTransitionClass(el, startClass);\n      if (!cb.cancelled) {\n        addTransitionClass(el, toClass);\n        if (!userWantsControl) {\n          if (isValidDuration(explicitEnterDuration)) {\n            setTimeout(cb, explicitEnterDuration);\n          } else {\n            whenTransitionEnds(el, type, cb);\n          }\n        }\n      }\n    });\n  }\n\n  if (vnode.data.show) {\n    toggleDisplay && toggleDisplay();\n    enterHook && enterHook(el, cb);\n  }\n\n  if (!expectsCSS && !userWantsControl) {\n    cb();\n  }\n}\n\nfunction leave (vnode, rm) {\n  var el = vnode.elm;\n\n  // call enter callback now\n  if (isDef(el._enterCb)) {\n    el._enterCb.cancelled = true;\n    el._enterCb();\n  }\n\n  var data = resolveTransition(vnode.data.transition);\n  if (isUndef(data) || el.nodeType !== 1) {\n    return rm()\n  }\n\n  /* istanbul ignore if */\n  if (isDef(el._leaveCb)) {\n    return\n  }\n\n  var css = data.css;\n  var type = data.type;\n  var leaveClass = data.leaveClass;\n  var leaveToClass = data.leaveToClass;\n  var leaveActiveClass = data.leaveActiveClass;\n  var beforeLeave = data.beforeLeave;\n  var leave = data.leave;\n  var afterLeave = data.afterLeave;\n  var leaveCancelled = data.leaveCancelled;\n  var delayLeave = data.delayLeave;\n  var duration = data.duration;\n\n  var expectsCSS = css !== false && !isIE9;\n  var userWantsControl = getHookArgumentsLength(leave);\n\n  var explicitLeaveDuration = toNumber(\n    isObject(duration)\n      ? duration.leave\n      : duration\n  );\n\n  if ( true && isDef(explicitLeaveDuration)) {\n    checkDuration(explicitLeaveDuration, 'leave', vnode);\n  }\n\n  var cb = el._leaveCb = once(function () {\n    if (el.parentNode && el.parentNode._pending) {\n      el.parentNode._pending[vnode.key] = null;\n    }\n    if (expectsCSS) {\n      removeTransitionClass(el, leaveToClass);\n      removeTransitionClass(el, leaveActiveClass);\n    }\n    if (cb.cancelled) {\n      if (expectsCSS) {\n        removeTransitionClass(el, leaveClass);\n      }\n      leaveCancelled && leaveCancelled(el);\n    } else {\n      rm();\n      afterLeave && afterLeave(el);\n    }\n    el._leaveCb = null;\n  });\n\n  if (delayLeave) {\n    delayLeave(performLeave);\n  } else {\n    performLeave();\n  }\n\n  function performLeave () {\n    // the delayed leave may have already been cancelled\n    if (cb.cancelled) {\n      return\n    }\n    // record leaving element\n    if (!vnode.data.show && el.parentNode) {\n      (el.parentNode._pending || (el.parentNode._pending = {}))[(vnode.key)] = vnode;\n    }\n    beforeLeave && beforeLeave(el);\n    if (expectsCSS) {\n      addTransitionClass(el, leaveClass);\n      addTransitionClass(el, leaveActiveClass);\n      nextFrame(function () {\n        removeTransitionClass(el, leaveClass);\n        if (!cb.cancelled) {\n          addTransitionClass(el, leaveToClass);\n          if (!userWantsControl) {\n            if (isValidDuration(explicitLeaveDuration)) {\n              setTimeout(cb, explicitLeaveDuration);\n            } else {\n              whenTransitionEnds(el, type, cb);\n            }\n          }\n        }\n      });\n    }\n    leave && leave(el, cb);\n    if (!expectsCSS && !userWantsControl) {\n      cb();\n    }\n  }\n}\n\n// only used in dev mode\nfunction checkDuration (val, name, vnode) {\n  if (typeof val !== 'number') {\n    warn(\n      \"<transition> explicit \" + name + \" duration is not a valid number - \" +\n      \"got \" + (JSON.stringify(val)) + \".\",\n      vnode.context\n    );\n  } else if (isNaN(val)) {\n    warn(\n      \"<transition> explicit \" + name + \" duration is NaN - \" +\n      'the duration expression might be incorrect.',\n      vnode.context\n    );\n  }\n}\n\nfunction isValidDuration (val) {\n  return typeof val === 'number' && !isNaN(val)\n}\n\n/**\n * Normalize a transition hook's argument length. The hook may be:\n * - a merged hook (invoker) with the original in .fns\n * - a wrapped component method (check ._length)\n * - a plain function (.length)\n */\nfunction getHookArgumentsLength (fn) {\n  if (isUndef(fn)) {\n    return false\n  }\n  var invokerFns = fn.fns;\n  if (isDef(invokerFns)) {\n    // invoker\n    return getHookArgumentsLength(\n      Array.isArray(invokerFns)\n        ? invokerFns[0]\n        : invokerFns\n    )\n  } else {\n    return (fn._length || fn.length) > 1\n  }\n}\n\nfunction _enter (_, vnode) {\n  if (vnode.data.show !== true) {\n    enter(vnode);\n  }\n}\n\nvar transition = inBrowser ? {\n  create: _enter,\n  activate: _enter,\n  remove: function remove$$1 (vnode, rm) {\n    /* istanbul ignore else */\n    if (vnode.data.show !== true) {\n      leave(vnode, rm);\n    } else {\n      rm();\n    }\n  }\n} : {};\n\nvar platformModules = [\n  attrs,\n  klass,\n  events,\n  domProps,\n  style,\n  transition\n];\n\n/*  */\n\n// the directive module should be applied last, after all\n// built-in modules have been applied.\nvar modules = platformModules.concat(baseModules);\n\nvar patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });\n\n/**\n * Not type checking this file because flow doesn't like attaching\n * properties to Elements.\n */\n\n/* istanbul ignore if */\nif (isIE9) {\n  // http://www.matts411.com/post/internet-explorer-9-oninput/\n  document.addEventListener('selectionchange', function () {\n    var el = document.activeElement;\n    if (el && el.vmodel) {\n      trigger(el, 'input');\n    }\n  });\n}\n\nvar directive = {\n  inserted: function inserted (el, binding, vnode, oldVnode) {\n    if (vnode.tag === 'select') {\n      // #6903\n      if (oldVnode.elm && !oldVnode.elm._vOptions) {\n        mergeVNodeHook(vnode, 'postpatch', function () {\n          directive.componentUpdated(el, binding, vnode);\n        });\n      } else {\n        setSelected(el, binding, vnode.context);\n      }\n      el._vOptions = [].map.call(el.options, getValue);\n    } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {\n      el._vModifiers = binding.modifiers;\n      if (!binding.modifiers.lazy) {\n        el.addEventListener('compositionstart', onCompositionStart);\n        el.addEventListener('compositionend', onCompositionEnd);\n        // Safari < 10.2 & UIWebView doesn't fire compositionend when\n        // switching focus before confirming composition choice\n        // this also fixes the issue where some browsers e.g. iOS Chrome\n        // fires \"change\" instead of \"input\" on autocomplete.\n        el.addEventListener('change', onCompositionEnd);\n        /* istanbul ignore if */\n        if (isIE9) {\n          el.vmodel = true;\n        }\n      }\n    }\n  },\n\n  componentUpdated: function componentUpdated (el, binding, vnode) {\n    if (vnode.tag === 'select') {\n      setSelected(el, binding, vnode.context);\n      // in case the options rendered by v-for have changed,\n      // it's possible that the value is out-of-sync with the rendered options.\n      // detect such cases and filter out values that no longer has a matching\n      // option in the DOM.\n      var prevOptions = el._vOptions;\n      var curOptions = el._vOptions = [].map.call(el.options, getValue);\n      if (curOptions.some(function (o, i) { return !looseEqual(o, prevOptions[i]); })) {\n        // trigger change event if\n        // no matching option found for at least one value\n        var needReset = el.multiple\n          ? binding.value.some(function (v) { return hasNoMatchingOption(v, curOptions); })\n          : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions);\n        if (needReset) {\n          trigger(el, 'change');\n        }\n      }\n    }\n  }\n};\n\nfunction setSelected (el, binding, vm) {\n  actuallySetSelected(el, binding, vm);\n  /* istanbul ignore if */\n  if (isIE || isEdge) {\n    setTimeout(function () {\n      actuallySetSelected(el, binding, vm);\n    }, 0);\n  }\n}\n\nfunction actuallySetSelected (el, binding, vm) {\n  var value = binding.value;\n  var isMultiple = el.multiple;\n  if (isMultiple && !Array.isArray(value)) {\n     true && warn(\n      \"<select multiple v-model=\\\"\" + (binding.expression) + \"\\\"> \" +\n      \"expects an Array value for its binding, but got \" + (Object.prototype.toString.call(value).slice(8, -1)),\n      vm\n    );\n    return\n  }\n  var selected, option;\n  for (var i = 0, l = el.options.length; i < l; i++) {\n    option = el.options[i];\n    if (isMultiple) {\n      selected = looseIndexOf(value, getValue(option)) > -1;\n      if (option.selected !== selected) {\n        option.selected = selected;\n      }\n    } else {\n      if (looseEqual(getValue(option), value)) {\n        if (el.selectedIndex !== i) {\n          el.selectedIndex = i;\n        }\n        return\n      }\n    }\n  }\n  if (!isMultiple) {\n    el.selectedIndex = -1;\n  }\n}\n\nfunction hasNoMatchingOption (value, options) {\n  return options.every(function (o) { return !looseEqual(o, value); })\n}\n\nfunction getValue (option) {\n  return '_value' in option\n    ? option._value\n    : option.value\n}\n\nfunction onCompositionStart (e) {\n  e.target.composing = true;\n}\n\nfunction onCompositionEnd (e) {\n  // prevent triggering an input event for no reason\n  if (!e.target.composing) { return }\n  e.target.composing = false;\n  trigger(e.target, 'input');\n}\n\nfunction trigger (el, type) {\n  var e = document.createEvent('HTMLEvents');\n  e.initEvent(type, true, true);\n  el.dispatchEvent(e);\n}\n\n/*  */\n\n// recursively search for possible transition defined inside the component root\nfunction locateNode (vnode) {\n  return vnode.componentInstance && (!vnode.data || !vnode.data.transition)\n    ? locateNode(vnode.componentInstance._vnode)\n    : vnode\n}\n\nvar show = {\n  bind: function bind (el, ref, vnode) {\n    var value = ref.value;\n\n    vnode = locateNode(vnode);\n    var transition$$1 = vnode.data && vnode.data.transition;\n    var originalDisplay = el.__vOriginalDisplay =\n      el.style.display === 'none' ? '' : el.style.display;\n    if (value && transition$$1) {\n      vnode.data.show = true;\n      enter(vnode, function () {\n        el.style.display = originalDisplay;\n      });\n    } else {\n      el.style.display = value ? originalDisplay : 'none';\n    }\n  },\n\n  update: function update (el, ref, vnode) {\n    var value = ref.value;\n    var oldValue = ref.oldValue;\n\n    /* istanbul ignore if */\n    if (!value === !oldValue) { return }\n    vnode = locateNode(vnode);\n    var transition$$1 = vnode.data && vnode.data.transition;\n    if (transition$$1) {\n      vnode.data.show = true;\n      if (value) {\n        enter(vnode, function () {\n          el.style.display = el.__vOriginalDisplay;\n        });\n      } else {\n        leave(vnode, function () {\n          el.style.display = 'none';\n        });\n      }\n    } else {\n      el.style.display = value ? el.__vOriginalDisplay : 'none';\n    }\n  },\n\n  unbind: function unbind (\n    el,\n    binding,\n    vnode,\n    oldVnode,\n    isDestroy\n  ) {\n    if (!isDestroy) {\n      el.style.display = el.__vOriginalDisplay;\n    }\n  }\n};\n\nvar platformDirectives = {\n  model: directive,\n  show: show\n};\n\n/*  */\n\nvar transitionProps = {\n  name: String,\n  appear: Boolean,\n  css: Boolean,\n  mode: String,\n  type: String,\n  enterClass: String,\n  leaveClass: String,\n  enterToClass: String,\n  leaveToClass: String,\n  enterActiveClass: String,\n  leaveActiveClass: String,\n  appearClass: String,\n  appearActiveClass: String,\n  appearToClass: String,\n  duration: [Number, String, Object]\n};\n\n// in case the child is also an abstract component, e.g. <keep-alive>\n// we want to recursively retrieve the real component to be rendered\nfunction getRealChild (vnode) {\n  var compOptions = vnode && vnode.componentOptions;\n  if (compOptions && compOptions.Ctor.options.abstract) {\n    return getRealChild(getFirstComponentChild(compOptions.children))\n  } else {\n    return vnode\n  }\n}\n\nfunction extractTransitionData (comp) {\n  var data = {};\n  var options = comp.$options;\n  // props\n  for (var key in options.propsData) {\n    data[key] = comp[key];\n  }\n  // events.\n  // extract listeners and pass them directly to the transition methods\n  var listeners = options._parentListeners;\n  for (var key$1 in listeners) {\n    data[camelize(key$1)] = listeners[key$1];\n  }\n  return data\n}\n\nfunction placeholder (h, rawChild) {\n  if (/\\d-keep-alive$/.test(rawChild.tag)) {\n    return h('keep-alive', {\n      props: rawChild.componentOptions.propsData\n    })\n  }\n}\n\nfunction hasParentTransition (vnode) {\n  while ((vnode = vnode.parent)) {\n    if (vnode.data.transition) {\n      return true\n    }\n  }\n}\n\nfunction isSameChild (child, oldChild) {\n  return oldChild.key === child.key && oldChild.tag === child.tag\n}\n\nvar isNotTextNode = function (c) { return c.tag || isAsyncPlaceholder(c); };\n\nvar isVShowDirective = function (d) { return d.name === 'show'; };\n\nvar Transition = {\n  name: 'transition',\n  props: transitionProps,\n  abstract: true,\n\n  render: function render (h) {\n    var this$1 = this;\n\n    var children = this.$slots.default;\n    if (!children) {\n      return\n    }\n\n    // filter out text nodes (possible whitespaces)\n    children = children.filter(isNotTextNode);\n    /* istanbul ignore if */\n    if (!children.length) {\n      return\n    }\n\n    // warn multiple elements\n    if ( true && children.length > 1) {\n      warn(\n        '<transition> can only be used on a single element. Use ' +\n        '<transition-group> for lists.',\n        this.$parent\n      );\n    }\n\n    var mode = this.mode;\n\n    // warn invalid mode\n    if ( true &&\n      mode && mode !== 'in-out' && mode !== 'out-in'\n    ) {\n      warn(\n        'invalid <transition> mode: ' + mode,\n        this.$parent\n      );\n    }\n\n    var rawChild = children[0];\n\n    // if this is a component root node and the component's\n    // parent container node also has transition, skip.\n    if (hasParentTransition(this.$vnode)) {\n      return rawChild\n    }\n\n    // apply transition data to child\n    // use getRealChild() to ignore abstract components e.g. keep-alive\n    var child = getRealChild(rawChild);\n    /* istanbul ignore if */\n    if (!child) {\n      return rawChild\n    }\n\n    if (this._leaving) {\n      return placeholder(h, rawChild)\n    }\n\n    // ensure a key that is unique to the vnode type and to this transition\n    // component instance. This key will be used to remove pending leaving nodes\n    // during entering.\n    var id = \"__transition-\" + (this._uid) + \"-\";\n    child.key = child.key == null\n      ? child.isComment\n        ? id + 'comment'\n        : id + child.tag\n      : isPrimitive(child.key)\n        ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)\n        : child.key;\n\n    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);\n    var oldRawChild = this._vnode;\n    var oldChild = getRealChild(oldRawChild);\n\n    // mark v-show\n    // so that the transition module can hand over the control to the directive\n    if (child.data.directives && child.data.directives.some(isVShowDirective)) {\n      child.data.show = true;\n    }\n\n    if (\n      oldChild &&\n      oldChild.data &&\n      !isSameChild(child, oldChild) &&\n      !isAsyncPlaceholder(oldChild) &&\n      // #6687 component root is a comment node\n      !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)\n    ) {\n      // replace old child transition data with fresh one\n      // important for dynamic transitions!\n      var oldData = oldChild.data.transition = extend({}, data);\n      // handle transition mode\n      if (mode === 'out-in') {\n        // return placeholder node and queue update when leave finishes\n        this._leaving = true;\n        mergeVNodeHook(oldData, 'afterLeave', function () {\n          this$1._leaving = false;\n          this$1.$forceUpdate();\n        });\n        return placeholder(h, rawChild)\n      } else if (mode === 'in-out') {\n        if (isAsyncPlaceholder(child)) {\n          return oldRawChild\n        }\n        var delayedLeave;\n        var performLeave = function () { delayedLeave(); };\n        mergeVNodeHook(data, 'afterEnter', performLeave);\n        mergeVNodeHook(data, 'enterCancelled', performLeave);\n        mergeVNodeHook(oldData, 'delayLeave', function (leave) { delayedLeave = leave; });\n      }\n    }\n\n    return rawChild\n  }\n};\n\n/*  */\n\nvar props = extend({\n  tag: String,\n  moveClass: String\n}, transitionProps);\n\ndelete props.mode;\n\nvar TransitionGroup = {\n  props: props,\n\n  beforeMount: function beforeMount () {\n    var this$1 = this;\n\n    var update = this._update;\n    this._update = function (vnode, hydrating) {\n      var restoreActiveInstance = setActiveInstance(this$1);\n      // force removing pass\n      this$1.__patch__(\n        this$1._vnode,\n        this$1.kept,\n        false, // hydrating\n        true // removeOnly (!important, avoids unnecessary moves)\n      );\n      this$1._vnode = this$1.kept;\n      restoreActiveInstance();\n      update.call(this$1, vnode, hydrating);\n    };\n  },\n\n  render: function render (h) {\n    var tag = this.tag || this.$vnode.data.tag || 'span';\n    var map = Object.create(null);\n    var prevChildren = this.prevChildren = this.children;\n    var rawChildren = this.$slots.default || [];\n    var children = this.children = [];\n    var transitionData = extractTransitionData(this);\n\n    for (var i = 0; i < rawChildren.length; i++) {\n      var c = rawChildren[i];\n      if (c.tag) {\n        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {\n          children.push(c);\n          map[c.key] = c\n          ;(c.data || (c.data = {})).transition = transitionData;\n        } else if (true) {\n          var opts = c.componentOptions;\n          var name = opts ? (opts.Ctor.options.name || opts.tag || '') : c.tag;\n          warn((\"<transition-group> children must be keyed: <\" + name + \">\"));\n        }\n      }\n    }\n\n    if (prevChildren) {\n      var kept = [];\n      var removed = [];\n      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {\n        var c$1 = prevChildren[i$1];\n        c$1.data.transition = transitionData;\n        c$1.data.pos = c$1.elm.getBoundingClientRect();\n        if (map[c$1.key]) {\n          kept.push(c$1);\n        } else {\n          removed.push(c$1);\n        }\n      }\n      this.kept = h(tag, null, kept);\n      this.removed = removed;\n    }\n\n    return h(tag, null, children)\n  },\n\n  updated: function updated () {\n    var children = this.prevChildren;\n    var moveClass = this.moveClass || ((this.name || 'v') + '-move');\n    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {\n      return\n    }\n\n    // we divide the work into three loops to avoid mixing DOM reads and writes\n    // in each iteration - which helps prevent layout thrashing.\n    children.forEach(callPendingCbs);\n    children.forEach(recordPosition);\n    children.forEach(applyTranslation);\n\n    // force reflow to put everything in position\n    // assign to this to avoid being removed in tree-shaking\n    // $flow-disable-line\n    this._reflow = document.body.offsetHeight;\n\n    children.forEach(function (c) {\n      if (c.data.moved) {\n        var el = c.elm;\n        var s = el.style;\n        addTransitionClass(el, moveClass);\n        s.transform = s.WebkitTransform = s.transitionDuration = '';\n        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {\n          if (e && e.target !== el) {\n            return\n          }\n          if (!e || /transform$/.test(e.propertyName)) {\n            el.removeEventListener(transitionEndEvent, cb);\n            el._moveCb = null;\n            removeTransitionClass(el, moveClass);\n          }\n        });\n      }\n    });\n  },\n\n  methods: {\n    hasMove: function hasMove (el, moveClass) {\n      /* istanbul ignore if */\n      if (!hasTransition) {\n        return false\n      }\n      /* istanbul ignore if */\n      if (this._hasMove) {\n        return this._hasMove\n      }\n      // Detect whether an element with the move class applied has\n      // CSS transitions. Since the element may be inside an entering\n      // transition at this very moment, we make a clone of it and remove\n      // all other transition classes applied to ensure only the move class\n      // is applied.\n      var clone = el.cloneNode();\n      if (el._transitionClasses) {\n        el._transitionClasses.forEach(function (cls) { removeClass(clone, cls); });\n      }\n      addClass(clone, moveClass);\n      clone.style.display = 'none';\n      this.$el.appendChild(clone);\n      var info = getTransitionInfo(clone);\n      this.$el.removeChild(clone);\n      return (this._hasMove = info.hasTransform)\n    }\n  }\n};\n\nfunction callPendingCbs (c) {\n  /* istanbul ignore if */\n  if (c.elm._moveCb) {\n    c.elm._moveCb();\n  }\n  /* istanbul ignore if */\n  if (c.elm._enterCb) {\n    c.elm._enterCb();\n  }\n}\n\nfunction recordPosition (c) {\n  c.data.newPos = c.elm.getBoundingClientRect();\n}\n\nfunction applyTranslation (c) {\n  var oldPos = c.data.pos;\n  var newPos = c.data.newPos;\n  var dx = oldPos.left - newPos.left;\n  var dy = oldPos.top - newPos.top;\n  if (dx || dy) {\n    c.data.moved = true;\n    var s = c.elm.style;\n    s.transform = s.WebkitTransform = \"translate(\" + dx + \"px,\" + dy + \"px)\";\n    s.transitionDuration = '0s';\n  }\n}\n\nvar platformComponents = {\n  Transition: Transition,\n  TransitionGroup: TransitionGroup\n};\n\n/*  */\n\n// install platform specific utils\nVue.config.mustUseProp = mustUseProp;\nVue.config.isReservedTag = isReservedTag;\nVue.config.isReservedAttr = isReservedAttr;\nVue.config.getTagNamespace = getTagNamespace;\nVue.config.isUnknownElement = isUnknownElement;\n\n// install platform runtime directives & components\nextend(Vue.options.directives, platformDirectives);\nextend(Vue.options.components, platformComponents);\n\n// install platform patch function\nVue.prototype.__patch__ = inBrowser ? patch : noop;\n\n// public mount method\nVue.prototype.$mount = function (\n  el,\n  hydrating\n) {\n  el = el && inBrowser ? query(el) : undefined;\n  return mountComponent(this, el, hydrating)\n};\n\n// devtools global hook\n/* istanbul ignore next */\nif (inBrowser) {\n  setTimeout(function () {\n    if (config.devtools) {\n      if (devtools) {\n        devtools.emit('init', Vue);\n      } else if (\n        true\n      ) {\n        console[console.info ? 'info' : 'log'](\n          'Download the Vue Devtools extension for a better development experience:\\n' +\n          'https://github.com/vuejs/vue-devtools'\n        );\n      }\n    }\n    if ( true &&\n      config.productionTip !== false &&\n      typeof console !== 'undefined'\n    ) {\n      console[console.info ? 'info' : 'log'](\n        \"You are running Vue in development mode.\\n\" +\n        \"Make sure to turn on production mode when deploying for production.\\n\" +\n        \"See more tips at https://vuejs.org/guide/deployment.html\"\n      );\n    }\n  }, 0);\n}\n\n/*  */\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Vue);\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ \"../node_modules/webpack/buildin/global.js\"), __webpack_require__(/*! ./../../timers-browserify/main.js */ \"../node_modules/timers-browserify/main.js\").setImmediate))\n\n//# sourceURL=webpack:///../node_modules/vue/dist/vue.runtime.esm.js?");

/***/ }),

/***/ "../node_modules/webpack/buildin/global.js":
/*!*************************************************!*\
  !*** ../node_modules/webpack/buildin/global.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var g;\n\n// This works in non-strict mode\ng = (function() {\n\treturn this;\n})();\n\ntry {\n\t// This works if eval is allowed (see CSP)\n\tg = g || new Function(\"return this\")();\n} catch (e) {\n\t// This works if the window reference is available\n\tif (typeof window === \"object\") g = window;\n}\n\n// g can still be undefined, but nothing to do about it...\n// We return undefined, instead of nothing here, so it's\n// easier to handle this case. if(!global) { ...}\n\nmodule.exports = g;\n\n\n//# sourceURL=webpack:///../node_modules/webpack/buildin/global.js?");

/***/ }),

/***/ "./newtab/App.vue":
/*!************************!*\
  !*** ./newtab/App.vue ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _App_vue_vue_type_template_id_b1d64916___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App.vue?vue&type=template&id=b1d64916& */ \"./newtab/App.vue?vue&type=template&id=b1d64916&\");\n/* harmony import */ var _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.vue?vue&type=script&lang=js& */ \"./newtab/App.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"../node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\n  _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _App_vue_vue_type_template_id_b1d64916___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _App_vue_vue_type_template_id_b1d64916___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* hot reload */\nif (true) {\n  var api = __webpack_require__(/*! ../node_modules/vue-hot-reload-api/dist/index.js */ \"../node_modules/vue-hot-reload-api/dist/index.js\")\n  api.install(__webpack_require__(/*! vue */ \"../node_modules/vue/dist/vue.runtime.esm.js\"))\n  if (api.compatible) {\n    module.hot.accept()\n    if (!module.hot.data) {\n      api.createRecord('b1d64916', component.options)\n    } else {\n      api.reload('b1d64916', component.options)\n    }\n    module.hot.accept(/*! ./App.vue?vue&type=template&id=b1d64916& */ \"./newtab/App.vue?vue&type=template&id=b1d64916&\", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ _App_vue_vue_type_template_id_b1d64916___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App.vue?vue&type=template&id=b1d64916& */ \"./newtab/App.vue?vue&type=template&id=b1d64916&\");\n(function () {\n      api.rerender('b1d64916', {\n        render: _App_vue_vue_type_template_id_b1d64916___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n        staticRenderFns: _App_vue_vue_type_template_id_b1d64916___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]\n      })\n    })(__WEBPACK_OUTDATED_DEPENDENCIES__); }.bind(this))\n  }\n}\ncomponent.options.__file = \"newtab/App.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./newtab/App.vue?");

/***/ }),

/***/ "./newtab/App.vue?vue&type=script&lang=js&":
/*!*************************************************!*\
  !*** ./newtab/App.vue?vue&type=script&lang=js& ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib!../../node_modules/vue-loader/lib??vue-loader-options!./App.vue?vue&type=script&lang=js& */ \"../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/lib/index.js?!./newtab/App.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./newtab/App.vue?");

/***/ }),

/***/ "./newtab/App.vue?vue&type=template&id=b1d64916&":
/*!*******************************************************!*\
  !*** ./newtab/App.vue?vue&type=template&id=b1d64916& ***!
  \*******************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_b1d64916___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib??vue-loader-options!./App.vue?vue&type=template&id=b1d64916& */ \"../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!./newtab/App.vue?vue&type=template&id=b1d64916&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_b1d64916___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_b1d64916___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./newtab/App.vue?");

/***/ }),

/***/ "./newtab/index.js":
/*!*************************!*\
  !*** ./newtab/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"../node_modules/vue/dist/vue.runtime.esm.js\");\n/* harmony import */ var _App_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.vue */ \"./newtab/App.vue\");\n\n\nnew vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\n  el: '#app',\n  render: h => h(_App_vue__WEBPACK_IMPORTED_MODULE_1__[\"default\"])\n}); // new Vue({\n//   store,\n//   render: h => h(App),\n// }).$mount('#app');\n\n//# sourceURL=webpack:///./newtab/index.js?");

/***/ })

/******/ });